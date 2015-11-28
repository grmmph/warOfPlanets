// Server config file. Please do not delete
var express = require('express');
var socket = require('socket.io');
var _ = require('underscore');
var app = express();
var server = app.listen(8080);
var io = socket.listen(server);
console.log("Serving at port 8080");

app.get('/', function(request, response){
  response.sendfile(__dirname + "/index.html");
});

app.use("/", express.static(__dirname));
var clientsCount = 0;
io.sockets.on('connection', function(socket) {
  clientsCount ++;
  var id = clientsCount%2;

  socket.on('sign-in', function () {
    io.sockets.connected[socket.id].emit('player-id', id);
  });

  socket.on('astroid-hit', function (astroid) {
    io.sockets.emit('astroid-hit', astroid);
  });

  socket.on('disconnect', function () {

  });
});
