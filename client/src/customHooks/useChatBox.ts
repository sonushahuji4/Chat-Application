import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import constant from '../constants/constant';
import { message } from '../modal/message';

const useChatBox = (socket: Socket) => {
    const [currentMessage, setCurrentMessage] = useState<any>('');
    const [messageList, setMessageList] = useState<message[]>([]);

    /** messages received from server and populate it in chat box ui*/
    useEffect(() =>{
        socket.on(constant.acceptRequestFromServer,(userMessage) =>{
            setMessageList((list) => [...list, userMessage]);
        });
    },[socket]);

    return {
        messageList,
        setMessageList,
        currentMessage,
        setCurrentMessage
    };
}

export default useChatBox;