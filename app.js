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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.static(getDirName() + "/public"));

app.use("/api", indexRouter);

app.get("/", (_req, res) => {
  res.sendFile("index", { root: getDirName() });
});
app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));

// io.on('connection', socket => {
//     console.log(socket);
//     console.log('nuevo cliente socket conectado')
// })

export default http;
