var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 6001

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const getOnlineUsers = () => {
    let clients = io.sockets.clients().connected;
    let sockets = Object.values(clients);
    let users = sockets.map(s => s.user);
    return users.filter(u => u != undefined)
}

io.on('connection', function (socket) {
    console.log('a user connected');

    const emitOnlineUsers = () => {
        socket.emit('users', getOnlineUsers())
    }

    socket.on('add_user', user => {
        socket.emit('server_message', {
            name: "Criotech",
            message: "welcome to criotech chat"
        })

        socket.broadcast.emit("server_message", {
            name: 'criotech',
            message: `${user.name} just joined chat`
        })

        socket.user = user
        emitOnlineUsers()
    })

    socket.on('disconnect', function () {
        const { user } = socket;

        if (user) {
            socket.broadcast.emit("server_message", {
                name: 'criotech',
                message: `${user.name} just left chat`
            })
        }

        emitOnlineUsers()
    })
});

http.listen(port, function () {
    console.log(`listening on *:${port}`);
});