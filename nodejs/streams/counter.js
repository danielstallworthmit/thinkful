function start(seconds, onStart, onProgress, onEnd) {
  onStart();
  var x = 0;
  var intval = setInterval(function(){
    if(x === 101){onEnd(); clearInterval(intval);}
    if (x % 10 === 0) {
      onProgress(x);
    }
    //console.log('hi')
    x++;
  }, seconds * 1000);
}

start(1, function() {
  console.log('Sequence started');
},
      function(progress) {
  console.log('Sequence currently ', progress, '% complete.');
},
      function() {
  console.log('Sequence is done!');
}
     );
