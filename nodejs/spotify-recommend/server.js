var unirest = require('unirest');
var express = require('express');
var events = require('events');
var async = require('async');

var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

var app = express();
app.use(express.static('public'));

app.get('/search/:name', function(req, res) {
    var searchReq = getFromApi('search', {
        q: req.params.name,
        limit: 1,
        type: 'artist'
    });

    searchReq.on('end', function(item) {
        var artist = item.artists.items[0].id;
   	var related = getFromApi('artists/'+ artist +'/related-artists');

        related.on('end', function(item) {
		var rels = item; //console.log(rels);
		var completed = 0;
		async.forEach(rels.artists, function(rel_artist) {
			var top_tracks = getFromApi('artists/'+ rel_artist.id +'/top-tracks',{
			    country: 'US'
			}); //console.log(top_tracks);

			top_tracks.on('end', function(item){
			    rel_artist.tracks = item.tracks
			    completed += 1; console.log(rel_artist.id);
			    checkComplete();
			});
			top_tracks.on('error', function(code) {
				res.sendStatus(code); console.log('error on tracks');
			});

			//res.json(rels)
		});

		var checkComplete = function(){
			if (completed === rels.artists.length) { console.log(rels.artists.length);
				res.json(rels);
			}
		};
	
	});

	related.on('error', function(code) {
		res.sendStatus(code);
	});
    });

    searchReq.on('error', function(code) {
        res.sendStatus(code);
    });
});

app.listen(3000);
