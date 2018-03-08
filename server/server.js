const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('new user connected')
    socket.emit('newEmail', {
        from: 'monk@gmail.com',
        text: 'Never gonna give you up',
        createAt: 123
    })

    socket.on('createMessage', (messageData) => {
        console.log('create Message', messageData);
        io.emit('newMessage', {
            from: messageData.from,
            text: messageData.text,
            createdAt: new Date().getTime()
        })
    })
    socket.on('disconnect', () => {
        console.log('user was diconnected');
    })

    socket.on('createEmail', (newEmail) => {
        console.log('create email', newEmail);
    })
})

app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`server is now listening at port ${port}`);
})

