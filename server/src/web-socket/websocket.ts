
import { Server } from "socket.io";
import * as dotenv from "dotenv";

const WEBSOCKET_CORS = {
    origin: `http:localhost:${process.env.CLIENT_PORT}/`, /** Establish connect to client Brower with this Endpoint */
    methods: ["GET","POST"] /** Only accept these two methods */
}

export class WebSocket extends Server {

    private static io: WebSocket;

    constructor(httpServer: any){
        super(httpServer,{
            cors : WEBSOCKET_CORS
        });
    }

    public static getInstance = (httpServer: any) => {
        if(!WebSocket.io){
            WebSocket.io = new WebSocket(httpServer);
        }
        return WebSocket.io;
    }
}