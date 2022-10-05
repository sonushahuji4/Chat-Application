import express, { Application } from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { Server } from  "socket.io";
import { WebSocket }  from "./web-socket/websocket";


interface authorData {
    author : string;
    chatRoom  : string;
    message : string;
    time : any;
}
dotenv.config();

const app: Application = express();

/** Middlerwaver */
app.use(cors);

/** To enable logging of request or response */
app.use(morgan("dev"));

/** creating a server */
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: process.env.CLENT_ENDPOINT,
      methods: ["GET", "POST"],
    },
  });
  io.on("connection",(socket) => {

// const socketIO: WebSocket = WebSocket.getInstance(server);
    console.log(`User connected: ${socket.id}`);

    /** Request from user to join chat */
    socket.on("request", (userData) => {
        socket.join(userData);
        console.log(`User with I: ${socket.id} has joined room: ${userData}`);
    });

    /** Send and Receive message request for chat */
    socket.on("send_request_to_server_from_client", (data: authorData) => {
        console.log("Received User data from client :", data);
        socket.to(data.chatRoom).emit("accept_request_from_server", data);
    });

    /** Request to leave the chat */
    socket.on("disconnect", () =>{
        console.log(`User disconnected ${socket.id}`);
    });
});


/** server listening on port  */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on : ${process.env.SERVER_PORT}`);
});