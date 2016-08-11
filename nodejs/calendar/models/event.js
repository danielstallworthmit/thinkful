var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../db/connect');
// var mongoose = Promise.promisifyAll(require('mongoose'));

var EventSchema = new mongoose.Schema({
	summary: {type: String, required: true},
	start: {type: Date},
	end: {type: Date},
	startYear: {type: Number},
	startMonth: {type: Number},
	startDay: {type: Number},
	endYear: {type: Number},
	endMonth: {type: Number},
	endDay: {type: Number},
	timeZone: {type: String}
});

var Event = db.events.model('Event', EventSchema);

module.exports = Event;