const express = require("express");
const indexRouter = require("./src/routes/index");
require("dotenv").config();
const logger = require("morgan");
const app = express();
const errorHandler = require("./src/middlewares/errorHandlers");
require("ejs");

//settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public/form/"));
app.use("/", indexRouter);
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views/pages");
app.use(errorHandler);

module.exports = app;
