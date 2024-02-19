import React, { useContext, useEffect, useState } from "react";
import { socket, userContext } from "../../App";

export default function MessagesList({ message,room }) {
  const [messages, setMessages] = useState({room:'',data:[]});
  const {user} = useContext(userContext);
  useEffect(() => {
    if (!socket) return;
    socket.on("messageReceive", (data) => {
      setMessages(data);
    });
  }, [socket]);

  useEffect(()=>{
    if(room){
        localStorage.setItem(messages.room, JSON.stringify(messages))
        if(localStorage.getItem(room)){
            setMessages(JSON.parse(localStorage.getItem(room)))
        }
        else{
            setMessages({room:'',data:[]})
        }
        socket.emit('joinRoom',room)
    }
  },[room])
  useEffect(() => {
    socket.emit("message", {room, data:[...messages.data,{msg:message,user}] });
  }, [message]);
  return (
    <div>
      {messages.data.length>0&&messages.data.map((msg, index) => {
        return (
          <div
            style={{
              backgroundColor: msg.user == user ? "green" : "yellow",
            }}
            key={msg.user + index}
          >
            {msg.msg}
          </div>
        );
      })}
    </div>
  );
}
