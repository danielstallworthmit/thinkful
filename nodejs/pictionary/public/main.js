var pictionary = function() {
    var socket = io();
    var canvas, context;
    var drawing = false;
    var guessBox, guesses, myturn;
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
            if (drawing && myturn) {
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

    var rightGuess = function(){
        guesses.text('You are correct. Your turn to draw.');
    };

    socket.on('message', addGuess);
    socket.on('draw', draw);
    socket.on('clearCanvas', function() {
        context.clearRect ( 0 , 0 , canvas.width() , canvas.height() );
    });
    socket.on('wordGuessed', function(msg) {
        socket.emit('message', rightGuess);
        if(myturn = true) {
            readytodraw.prop('value', 'Ready to draw!');
        }
    });
    socket.on('youCanDraw', function(msg) {
        if(myturn) {
            myturn = false;
            //status.text('status: online | Click Ready to draw! button to start drawing');
        }
        //chatcontent.append('<p>Click <strong>Ready to draw!</strong> button to draw.</p>');
        //chatScrollDown();
    });
    socket.on('youDraw', function(word) {
        myturn = true;
        //canvas.css('background-color', '#fff');
        myword = word; console.log(word);
        //status.text('status: online | Your word is: ' + myword[0] + ' (difficulty: ' + myword[1] + ')');
        //readytodraw.prop('value', 'Pass (' + timeleft + ')');
        
        // turn on drawing timer
        //drawingTimer = setInterval( timerTick, 1000 );
    });
};

$(document).ready(function() {
    pictionary();
});
