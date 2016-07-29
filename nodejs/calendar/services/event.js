var Event = require('../models/event');

exports.save = function(summary, start, end, cb) {
	Event.create({ summary: summary, start: start, end:end }, function(err, event) {
		if(err) {
			cb(err);
			return;
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

exports.update = function(id, summary, start, end, cb) {
	Event.findOneAndUpdate({ _id: id }, { summary: summary, start: start, end:end }, function(err, event) {
		if(err) {
			exports.save(summary, start, end, cb);
			return;
		}
		cb(null, event);
	});
};

exports.del = function(id, cb) {
	Event.findOneAndRemove({ _id: id }, function(err, event) {
		if(err) {
			cb(err);
			return;
		}
		cb(null, event);
	});
};

