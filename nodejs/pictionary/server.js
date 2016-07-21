var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

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

var randUsers = []
var numUsers = 0;
var playerTurn = 0;
var randWord = WORDS[Math.floor(Math.random()*WORDS.length)]
console.log(randWord);

io.on('connection', function(socket){
	var randUser = Math.floor(Math.random()*1000000);
	socket.username = 'user' + randUser;
	randUsers.push(socket.username);
    ++numUsers;
    addedUser = true;
    if (playerTurn < 1 || numUsers === 1) { playerTurn = socket.username; }
	
    if (playerTurn === socket.username) {
    	socket.emit('wordMessage', 'Current Word to draw is ' + randWord);
    }
    var checkPlayerNumber = function (){
		if (numUsers === 1) {
    		io.emit('playMessage', 'Not enough players! Wait for others to join.');
    	}
    	else {
    		io.emit('playMessage', 'There are enough players! Play Pictionary.');
    	}
	}
    checkPlayerNumber();
    
    console.log(socket.username);
    console.log('turn: ' + playerTurn);
    console.log('users: ' + numUsers);

	socket.on('message', function(message){
		console.log('Current Guess: ' + message);
		if (message === randWord){
			socket.emit('playMessage', 'That is correct! Now your turn to draw.');
			socket.broadcast.emit('playMessage', '');
			randWord = WORDS[Math.floor(Math.random()*WORDS.length)]
			socket.emit('wordMessage', 'Current Word to draw is ' + randWord);
			socket.broadcast.emit('wordMessage', '');
			playerTurn = socket.username;
			io.emit('clearCanvas');
		}
		io.emit('message', message);
	});

	socket.on('draw', function(position){
		if (playerTurn === socket.username){
			io.emit('draw', position);
		}
	});

	socket.on('disconnect', function(){
		--numUsers;
		randUsers.splice(randUsers.indexOf(socket.username), 1);
		if (numUsers > 1){
			if (playerTurn === socket.username){
				//playerTurn = randUsers[0];
				socket.broadcast.emit('playMessage', 'Drawer left. Enter word below to become new drawer.');
				socket.broadcast.emit('wordMessage', 'Current Word to draw is ' + randWord);
				socket.broadcast.emit('clearCanvas');
				//io.emit('wordMessage', 'Current Word to draw is ' + randWord);
			}
		}
		else {
			checkPlayerNumber();
			playerTurn = randUsers[0];
			socket.broadcast.emit('wordMessage', 'Current Word to draw is ' + randWord);
			io.emit('clearCanvas');
		}
	});
});

server.listen(3030);
