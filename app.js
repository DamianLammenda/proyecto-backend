import express from "express";
import _ from "lodash";
import logger from "morgan";

import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";

import indexRouter from "./src/routes/index.js";
import errorHandler from "./src/middlewares/errorHandlers.js";

import dotenv, { config } from "dotenv";
dotenv.config();
import { getDirName } from "./utils.js";
import clientRouter from "./src/routes/client/index.js";

const app = express();
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.static(getDirName() + "/public"));

app.use('/', clientRouter)
app.use("/api", indexRouter);


app.use(errorHandler);

export default http;
