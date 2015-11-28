// Server config file. Please do not delete
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(8080);
var io = socket.listen(server);
console.log("Serving at port 8080");

app.get('/', function(request, response){
  response.sendfile(__dirname + "/index.html");
});

app.use("/", express.static(__dirname));

io.sockets.on('connection', function(socket) {
  socket.on('sign-in', function () {
    socket.emit('player-id', socket.id);
  });

  socket.on('shoot', function (bulletObject) {
    socket.emit('bullet-change', socket.id, bulletObject);
  });
});
