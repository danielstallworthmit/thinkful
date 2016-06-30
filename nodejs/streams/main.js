var Alphabet = require('./alphabet');
var Cache = require('./cache');
var alpha = new Alphabet();
var cache = new Cache('alpha1');

alpha.pipe(cache);

cache.on('finish', function() {
    console.log('Cache store:');
    for (var key in Cache.store) {
        console.log(key, ':', Cache.store[key]);
    }
});

var alpha = new Alphabet();
alpha.on('data', function(chunk) {
    console.log(chunk.toString());
});


