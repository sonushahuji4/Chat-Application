import './App.css';
import { io, Socket} from'socket.io-client';
import React, { useState } from 'react';
import ChatBox from './components/chatBox';

const socket: Socket = io('http://localhost:3001/',{ transports: ['websocket']});


const App = () => {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

  const join = () =>{
    if(userName !=='' && room !==''){
      socket.emit("request",room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Chat App</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Create Room ID and Share"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={join}>Start Chat</button>
        </div>
      ) : (
        <ChatBox 
          socket={socket} 
          author={userName} 
          chatRoom={room} 
          time={time}/>
      )}
    </div>
  );
}

export default App;
