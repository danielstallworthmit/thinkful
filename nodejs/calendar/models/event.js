var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('../db/connect');
var mo = require('moment-timezone')
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
	timeZone: {type: String},
	userid: {type: String}
});

EventSchema.pre('save', function(next){ console.log(this.end)
		var moStart = mo(this.start).tz(this.timeZone), moEnd = mo(this.end).tz(this.timeZone)
		this.startYear = moStart.format('YYYY'), this.startMonth = moStart.format('M'), this.startDay = moStart.format('D')
		this.endYear = moEnd.format('YYYY'), this.endMonth = moEnd.format('M'), this.endDay = moEnd.format('D') 
		// this.userid = this.user._id
		next()
})

EventSchema.pre('update', function(next){
		var moStart = mo(this.start).tz(this.timeZone), moEnd = mo(this.end).tz(this.timeZone)
		this.update({}, {$set: { 
			startYear: moStart.format('YYYY'), startMonth: moStart.format('M'), startDay: moStart.format('D'),
			endYear: moEnd.format('YYYY'), endMonth: moEnd.format('M'), endDay: moEnd.format('D') 
		}})
		next()
})

var Event = db.events.model('Event', EventSchema);

module.exports = Event;