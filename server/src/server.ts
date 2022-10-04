import express, { Application } from "express";
import http, { Server } from "http";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { WebSocket }  from "./web-socket/websocket";

dotenv.config();

const app: Application = express();

/** Middlerwaver */
app.use(cors);

/** To enable logging of request or response */
app.use(morgan("dev"));

/** creating a server */
const server: Server = http.createServer(app);

const socketIO: WebSocket = WebSocket.getInstance(server);
socketIO.on("connection",(socket) => {
    console.log(`User connected: ${socket.id}`);

    /** Request from user to join chat */
    socket.on("request", (userData) => {
        socket.join(userData);
        console.log(`User with I: ${socket.id} has joined room: ${userData}`);
    });

    /** Send and Receive message request for chat */
    socket.on("send", (data) => {
        socket.to(data.room).emit("receive", data);
    });

    /** Request to leave the chat */
    socket.on("disconnect", () =>{
        console.log(`User disconnected ${socket.id}`);
    });
});


/** server listening on port  */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on port : ${process.env.SERVER_PORT}`);
});