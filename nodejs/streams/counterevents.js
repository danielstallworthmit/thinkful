var events = require('events');

var player = new events.EventEmitter();

player.on('onProgress', function(progress) {
    console.log('Sequence currently ', progress, '% complete.');
});

player.on('onStart', function(seconds) {
  console.log('Sequence started');
  var x = 0;
  var intval = setInterval(function(){
    if(x === 101){player.emit('onEnd'); clearInterval(intval);}
    if (x % 10 === 0) {
      player.emit('onProgress', x);
    }
    x++;
  }, seconds * 1000);}
);

player.on('onEnd', function() {
    console.log('Sequence is done!');
});

player.emit('onStart', 0.5);
