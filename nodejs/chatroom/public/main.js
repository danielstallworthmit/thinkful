$(document).ready(function() {
    var username = '';
    var connected = false;
    var socket = io();
    var connectedinfo = $('#connectedinfo')
    var userinput = $('#userfield');
    var input = $('#messageinput');
    var messages = $('#messages');

    // Get random color for this user
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var color = "rgb(" + r + ","+ g + "," + b + ")"


    function participantsMessage (data) {
	var usermessage = '';
	if (data.numUsers === 1) {
	    usermessage += "There is only 1 participant in this chat";
	} else {
	    usermessage += "There are " + data.numUsers + " participants in this chat";
	}
	connectedinfo.html(usermessage);
    }
    
    var addMessage = function(message) { console.log('add message');
        messages.prepend('<div style="color:' + message.color + '">' + message.message + '</div>');
    };

    function userleave(data) {
	var message = data.username + ' left';
	socket.emit('message', {message: message, color: color});
    }

    userinput.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        username = userinput.val();
	var usermessage = username + ' joined';
        //addMessage(usermessage);
	socket.emit('message', {message: usermessage, color: color});
	socket.emit('add user', username);
        //input.val('');
    });


    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
	if (!username) {return;}

        var message = username + ' says: ' + input.val();
        //addMessage(message);
	socket.emit('message', {message: message, color: color});
        input.val('');
    });

    socket.on('message', addMessage); 

    socket.on('login', function (data) {
	connected = true;
	// Display the welcome message
	//var message = "Welcome to Socket.IO Chat – ";
	participantsMessage(data);
      });
	
    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
	//userleave(data); console.log('left called');
	participantsMessage(data);
	//removeChatTyping(data);
    });
});
