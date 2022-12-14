const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
const path = require("path");
const crudRouter = require("./router/crudRouter");
const playerRouter = require("./router/playerRouter");
const userRouter = require("./router/userRouter");
const globalErrorHandling = require("./utils/globalErrorHandling");
const swaggerDoc = require("./swagger.json");

const app = express();

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDoc));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/crud", crudRouter);
app.use("/api/v1/player", playerRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Api not found",
  });
});
app.use(globalErrorHandling);

module.exports = app;
