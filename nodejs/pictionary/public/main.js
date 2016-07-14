var pictionary = function() {
    var socket = io();
    var canvas, context;
    var drawing = false;
    var guessBox, guesses;
    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    canvas.on('mousedown', function(event){
        drawing = true;
        canvas.on('mousemove', function(event) {
            if (drawing) {
                var offset = canvas.offset();
                var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};
                draw(position);
                socket.emit('draw', position);
            }
        });
    });
    canvas.on('mouseup', function(event){
        drawing = false;
    });

    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
          return;
        }

        //console.log(guessBox.val());
        var message = guessBox.val();
        socket.emit('message', message);
        guessBox.val('');
    };

    guessBox = $('#guess input');
    guessBox.on('keydown', onKeyDown);

    guesses = $('#guesses');

    var addGuess = function(guess){
        guesses.text('Current Guess: ' + guess);
    };

    socket.on('message', addGuess);
    socket.on('draw', draw)
};

$(document).ready(function() {
    pictionary();
});
