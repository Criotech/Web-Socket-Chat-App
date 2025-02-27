var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 6001

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('join_room', room => {
        socket.join(room);
    })

    socket.on('message', ({ room, message }) => {
        socket.to(room).emit('message', {
            message,
            name: 'Friend'
        });
    });

    socket.on('typing', ({ room }) => {
        socket.to(room).emit('typing', 'Someone is typing')
    });

    socket.on('stopped_typing', ({ room }) => {
        socket.to(room).emit('stopped_typing')
    });

    socket.on('disconnect', function () {
        console.log('a user disconnected')
    })
});

http.listen(port, function () {
    console.log(`listening on *:${port}`);
});