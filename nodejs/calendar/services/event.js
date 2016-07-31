var Event = require('../models/event');

exports.save = function(event, cb) {
	Event.create(event, function(err, event) {
		if(err) {
			return cb(err);
		}
		cb(null, event);
	});
};

exports.list = function(cb) {
	Event.find(function(err, events) {
		if(err) {
			cb(err);
			return;
		}
		cb(null, events);
	});
};

exports.update = function(id, event, cb) {
	Event.findOneAndUpdate({ _id: id }, event, function(err, event) {
		if(err) {
			//exports.save(event, cb);
			return cb(err);
		}
		return cb(null, event);
	});
};

exports.del = function(id, cb) {
	Event.findOneAndRemove({ _id: id }, function(err, event) {
		if(err) {
			return cb(err);
		}
		cb(null, event);
	});
};

