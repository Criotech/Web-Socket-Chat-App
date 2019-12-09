var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 6001

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const getVisitors = ()=>{
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(s => s.user);
  return users
}

const emitVisitors = () => {
  io.emit('visitor', getVisitors())
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('new_visitor', user => {
    console.log('new_visitor', user)
    socket.user = user 
    emitVisitors()
  })

  socket.on('disconnect', function(){
      console.log('a user disconnected')
      emitVisitors()
      
  })
});

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});