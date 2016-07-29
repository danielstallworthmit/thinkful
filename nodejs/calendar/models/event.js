var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	summary: { type: String, required: true },
	start: {type: Date},
	end: {type: Date}
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;