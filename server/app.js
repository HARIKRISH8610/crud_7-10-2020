const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const crudRouter = require("./router/crudRouter");
const playerRouter = require("./router/playerRouter");
const globalErrorHandling = require("./utils/globalErrorHandling");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/crud", crudRouter);
app.use("/api/v1/player", playerRouter);

app.use(globalErrorHandling);

module.exports = app;
