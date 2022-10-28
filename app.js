const express = require("express");
const indexRouter = require("./src/routes/index");
require("dotenv").config();
const app = express();
const errorHandler = require('./src/middlewares/errorHandlers')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public",express.static(__dirname + "/public/form/"));
app.use("/api", indexRouter);
app.use(errorHandler)

module.exports = app; 