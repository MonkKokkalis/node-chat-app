const socket = io();

socket.on('connect', () => {
    console.log('conneted to the server')
})

socket.on('disconnect', () => {
    console.log('disconnected from the server');
})

socket.on('newEmail', (email) => {
    console.log('new email', email)
})

socket.on('newMessage', function(messageData) {
    console.log(messageData);
})