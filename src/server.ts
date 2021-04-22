import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import http from "http"
import socketIo from "socket.io";
import log from "@src/utils/Log";
import bodyParser from "body-parser";

const StatsD = require('hot-shots');
//const router = require("@src/router")
const mongoOptions = {}

const app = express();

const dogstatsd = new StatsD({
    errorHandler: (error: Error) => {
        log.error(`Socket errors caught here: ${error}`);
    }
});

// mongodb connection stuff here

app.use(bodyParser.json());
//app.use('/', router);
const MAX_PLAYERS = 10
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer);

let rooms = {};

io.on("connection", function(socket) {
   // todo: do something when a client connects
})

export default httpServer;