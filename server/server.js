const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const yesno = require("yesno");

//configure dotenv file

dotenv.config({ path: "./config.env" });

// get DB url in config.env file

const db = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);

// connect to mongo db

mongoose
  .connect(process.env.LOCAL_DB_URL)
  .then(() => console.log(`\r\n✔✔ Database connected successfully ✔✔`))
  .catch((err) => {
    console.log(`Something went wrong while connecting database💥\ ${err}`);
  });

// create server
let port = process.env.PORT || 8000;
const server = () => {
  return app.listen(port, () => {
    console.log(`Server is listening in a port ${port} `);
  });
};
server().on("error", async (err) => {
  if (err.code === "EADDRINUSE") {
    await yesno({ question: "Are you sure to change port?" });
    port = parseInt(port) + 1;
    server().close(() => {
      return server();
    });
  }
});
