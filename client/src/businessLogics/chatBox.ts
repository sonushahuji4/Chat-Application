import { Socket } from 'socket.io-client';
import { message } from '../modal/message';
import constant from '../constants/constant';


export class ChatBoxLogic {

    public static sendMessage = async (props: message, socket: Socket, setMessageList: any, setCurrentMessage: any, ) =>{
        if(props.message !== ""){
            const messageBody: message = {
                chatRoom : props.chatRoom,
                author   : props.author,
                message  : props.message,
                time     : props.time
            }
            await socket.emit(constant.sendRequestToServer, messageBody);
            setMessageList((list: message[]): message[] => [...list, messageBody]);
            setCurrentMessage("");
        }
    }
}