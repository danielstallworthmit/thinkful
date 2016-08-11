var Event = require('../models/event');
var User = require('../models/user');

exports.eventsCreate = function(cb) {
	Event.create(
		{"summary": "Eating dinner", "start": "2016-08-10 15:30:00", "end": "2016-08-10 17:30:00", "timeZone": "America/Chicago"},
		{"summary": "Playing at the park", "start": "2016-08-10 13:30:00", "end": "2016-08-10 15:30:00", "timeZone": "America/Chicago"},
		{"summary": "Extreme workout at the gym", "start": "2016-08-10 05:30:00", "end": "2016-08-10 13:30:00", "timeZone": "America/Chicago"},
		function(err, events) {
			if(err) {
				cb(err);
				return;
			}
			cb(null, events);
		}
	);
};

exports.usersCreate = function(cb) {
	User.create(
		{"username": "billy", "password": "pass"},
		{"username": "joe", "password": "pass"},
		{"username": "craig", "password": "pass"},
		function(err, users) {
			if(err) {
				return cb(err);
			}
			cb(null, users);
		}
	);
};

if (require.main === module) {
	require('./connect');
	exports.run(
		function(err) {
			if(err) {
				console.error(err);
				return;
			}
			var mongoose = require('mongoose');
			mongoose.disconnect();
		}
	);
}

