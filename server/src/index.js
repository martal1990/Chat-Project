const path = require('path');
const http = require('http');
const express = require('express');
require('cors');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: {
    origin: "http://localhost:3000",
    methods: ['OPTIONS, GET, POST, PUT, PATCH, DELETE'],
    allowedHeaders: ["my-custom-header"],
    credentials: true
}});

const port = process.env.PORT || 3100;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
    console.log('New webSocket connection');
    socket.on('sendMessage', (message) => {
        io.emit('newMessage', message);
    })
})

server.listen(port, () => {
    console.log(`server is up on port ${port}!`);
});