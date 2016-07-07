$(document).ready(function() {
    var username = '';
    var connected = false;
    var socket = io();
    var connectedinfo = $('#connectedinfo')
    var userinput = $('#userfield');
    var input = $('#messageinput');
    var messages = $('#messages');

    function addParticipantsMessage (data) {
	var usermessage = '';
	if (data.numUsers === 1) {
	    usermessage += "There is only 1 participant in this chat";
	} else {
	    usermessage += "There are " + data.numUsers + " participants in this chat";
	}
	connectedinfo.html(usermessage);
    }
    
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    userinput.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        username = userinput.val();
	var usermessage = username + ' joined';
        addMessage(usermessage);
	socket.emit('message', usermessage);
	socket.emit('add user', username);
        //input.val('');
    });


    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
	if (!username) {return;}

        var message = username + ' says: ' + input.val();
        addMessage(message);
	socket.emit('message', message);
        input.val('');
    });

    socket.on('message', addMessage);

    socket.on('login', function (data) {
	connected = true;
	// Display the welcome message
	//var message = "Welcome to Socket.IO Chat – ";
	addParticipantsMessage(data);
      });
	
    socket.on('user joined', function (data) {
	//log(data.username + ' joined');
	addParticipantsMessage(data);
    });
});
