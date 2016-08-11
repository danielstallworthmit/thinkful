var express = require('express');
var Event = require('../services/event');
var router = express.Router();
var mo = require('moment-timezone')

router.get('/events/:yr', (req, res) => {
	Event.yrAgg(Number(req.params.yr), req.user._id)
		.then((events) => {
			if (!events || !events.length) { return res.status(404); }
			res.status(200).json(events);
			
		})
		.catch((err) => res.status(400).json(err))
});

router.get('/events/:yr/:mth', (req, res) => {
	Event.month(Number(req.params.yr), Number(req.params.mth), req.user._id)
		.exec().then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});

router.get('/events/:yr/:mth/:days', (req, res) => {
	var days = req.params.days.split('-')
	//var daysStart = days[0], daysEnd = days[1]
	Event.days(Number(req.params.yr), Number(req.params.mth), Number(days[0]), Number(days[1]), req.user._id)
		.exec().then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});


router.get('/events', function(req, res, next) { //console.log(req.user._id)
	Event.list(req.user._id).exec()
		.then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});

router.post('/events', function(req, res) { 
	var moStart = mo(req.body.start).tz(req.body.timeZone), moEnd = mo(req.body.end).tz(req.body.timeZone)
	req.body.startYear = moStart.format('YYYY'), req.body.startMonth = moStart.format('M'), req.body.startDay = moStart.format('D')
	req.body.endYear = moEnd.format('YYYY'), req.body.endMonth = moEnd.format('M'), req.body.endDay = moEnd.format('D') 
	req.body.userid = req.user._id
	Event.save(req.body)
		.then((event) => res.status(201).json(event))
		.catch((err) => res.status(400).json(err))
});

router.put('/events/:id', function(req, res) {
	Event.update(req.params.id, req.body).exec()
		.then((event) => res.status(200).json(event))
		.catch((err) => res.status(400).json(err))
});

router.delete('/events/:id', function(req, res) {
	Event.del(req.params.id).exec()
		.then((event) => res.status(200).json(event))
		.catch((err) => res.status(400).json(err))
});

// app.use(function(err, req, res, next) {
//   return res.status(400).json(err);
// });

module.exports = router;
