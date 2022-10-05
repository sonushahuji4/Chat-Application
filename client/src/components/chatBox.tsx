import React from 'react';
import { Socket } from 'socket.io-client';
import  useChatBox  from '../customHooks/useChatBox';
import { message } from '../modal/message';
import { ChatBoxLogic } from '../businessLogics/chatBox';
import ScrollToBottom from "react-scroll-to-bottom";

interface Props {
    socket  : Socket;
    author : string;
    chatRoom : string;
    time: any
}

const ChatBox = ({chatRoom, author, socket, time}: Props) => {

    const { messageList,setMessageList,currentMessage,setCurrentMessage } = useChatBox(socket);

    const renderMessages = (messageList: message[]) => {
      return messageList.map((msg: message) => {
        return (
          <div className="message" id={author === msg.author ? "you" : "other"}>
            <div>
              <div className="message-content"> <p>{msg.message}</p> </div>
              <div className="message-meta">
                <p id="time">{msg.time}</p>
                <p id="author">{msg.author}</p>
              </div>
            </div>
          </div>
        );
      })
    }

    return (
        <div className="chat-window">
            <p>Chat</p>

          <div className="chat-header">
          </div>

          <div className="chat-body">
            <ScrollToBottom className="message-container">
            {renderMessages(messageList)}
            </ScrollToBottom>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="message"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && ChatBoxLogic.sendMessage(
                  {chatRoom,author,message:currentMessage, time}, 
                  socket,
                  setMessageList,
                  setCurrentMessage);
              }}
            />

            <button 
              onClick={() => {
                ChatBoxLogic.sendMessage(
                  {chatRoom,author,message:currentMessage, time}, 
                  socket,
                  setMessageList,
                  setCurrentMessage)}}>&#9658;</button>
          </div>
        </div>
    );
}

export default ChatBox;