const express = require("express");
const morgan = require("morgan");
const crudRouter = require("./router/crudRouter");
const globalErrorHandling = require("./utils/globalErrorHandling");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/crud", crudRouter);
//stakasjbdnsj
app.use(globalErrorHandling);
module.exports = app;
