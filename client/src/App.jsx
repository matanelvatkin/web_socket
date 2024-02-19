import { io } from "socket.io-client";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import MessagesList from "./components/MessagesList";

export const socket = io("http://localhost:4000");
export const userContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
  const  [room,setRoom] = useState();
  const setMessageFromInput = (e) => {
    setMessage(e.target.value);
    e.target.value= ''
  };
  useEffect(() => {
    if (!socket) return;
    socket.on("connected", (userId) => {
      setUser(userId);
    });
  }, [socket]);
  return (
    <userContext.Provider value={{ user, setUser }}>
      <div>
        <input
        placeholder="message"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setMessageFromInput(e);
            }
          }}
        />
        <input
          type="text"
          placeholder="room"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setRoom(e.target.value);
              e.target.value=''
            }
          }}
        />
        <MessagesList message={message} room={room} />
      </div>
    </userContext.Provider>
  );
}

export default App;
