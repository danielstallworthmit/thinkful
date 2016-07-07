var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var numUsers = 0;

io.on('connection', function (socket) {
    var addedUser = false;
    console.log('Client connected');

    socket.on('add user', function (username) {
	if (addedUser) return;

	// we store the username in the socket session for this client
	socket.username = username;
	++numUsers;
	addedUser = true;
	io.emit('login', {
	   numUsers: numUsers
	});
	// echo globally (all clients) that a person has connected
	//socket.broadcast.emit('user joined', {
	    //username: socket.username,
	    //numUsers: numUsers
	//});
    });

    socket.on('message', function(message) {
	socket.color = message.color;
        console.log('Received message:', message);
        io.emit('message', message);
    });

    socket.on('disconnect', function () {
	if (addedUser) {
	--numUsers;

	// echo globally that this client has left
	io.emit('message', {message: socket.username + ' has left.', color: socket.color});
	io.emit('user left', {
	    username: socket.username,
	    numUsers: numUsers
	});
	}
    });

});

server.listen(process.env.PORT || 8080);
