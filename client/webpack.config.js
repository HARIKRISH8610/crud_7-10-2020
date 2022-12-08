const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { SourceMapDevToolPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const SpritePlugin = require(`svg-sprite-loader/plugin`);
module.exports = {
  context: __dirname,
  mode: "development",
  entry: { app: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
  },
  devServer: {
    historyApiFallback: true,
    port: 3001,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    modules: ["node_modules"],
    extensions: ["", ".js", ".jsx"],
    fallback: {
      crypto: false,
      fs: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      chunks: ["app"],
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
};
