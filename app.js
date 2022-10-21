const express = require("express");
const indexRouter = require("./src/routes/index");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public",express.static(__dirname + "/public/form/"));

app.use("/api", indexRouter);


module.exports = app; 