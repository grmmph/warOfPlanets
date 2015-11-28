// Server config file. Please do not delete
var express = require('express');
var app = express();
var server = app.listen(8080);
console.log("Serving at port 8080");

app.get('/', function(request, response){
  response.sendfile(__dirname + "/index.html");
});

app.use("/", express.static(__dirname));
