var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function(socket){
	socket.on('message', function(message){
		console.log('Current Guess: ' + message);
		io.emit('message', message);
	});

	socket.on('draw', function(position){
		socket.broadcast.emit('draw', position);
	})
});

server.listen(3000);
