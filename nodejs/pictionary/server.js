var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var users = [], canvas = [];
var dictionary, currentWord, currentPlayer, drawingTimer;

var WORDS = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];

io.on('connection', function(socket){
	socket.emit('youDraw');
	socket.on('message', function(message){
		//console.log('Current Guess: ' + message);
		io.emit('message', message);
	});

	socket.on('draw', function(position){
		if(currentPlayer == socket.id) {
			socket.broadcast.emit('draw', position);
		}
	});

	socket.on('clearCanvas', function () {
		if(currentPlayer == socket.id) {
			//canvas.splice(0, canvas.length);
			io.emit('clearCanvas');
		}
	});

	socket.on('readyToDraw', function () {
		if (!currentPlayer) {
			currentPlayer = socket.id;
			//canvas.splice(0, canvas.length);
			io.emit('clearCanvas');
			
			var randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
			
			//currentWord = word[0];
			socket.emit('youDraw', randomWord);
			//io.sockets.emit('firendDraw', { color: myColor, nick: myNick });			
		} else if (currentPlayer == socket.id) {
			turnFinished();
		}
	});

	function turnFinished() {
		currentPlayer = socket.id;
		io.sockets.emit('youCanDraw');
	}
});

server.listen(3000);
