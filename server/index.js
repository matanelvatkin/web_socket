const express = require('express')
const app = express()
const socketIo = require('socket.io');
const {createServer} = require('http');
const cors = require('cors');
const { Socket } = require('dgram');
const PORT = 4000;

const server = createServer(app);
const io = socketIo(server,{cors:{origin:'*'}});

io.on('connection', (socket) => {
  socket.emit('connected', socket.id)

  
  socket.on('joinRoom', (room) => {
    socket.join(room)
  })

  socket.on('message', (messages) =>{
    console.log(messages);
    io.to(messages.room).emit('messageReceive', messages)
  })
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});