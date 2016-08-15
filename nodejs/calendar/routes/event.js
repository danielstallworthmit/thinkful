var express = require('express');
var Event = require('../services/event');
var router = express.Router();
var passport = require('passport');

var auth = passport.authenticate('basic', {session: false})

router.get('/events/:yr', auth, (req, res) => {
	Event.yrAgg(Number(req.params.yr), req.user._id)
		.then((events) => {res.status(200).json(events)})
		.catch((err) => res.status(400).json(err))
});

router.get('/events/:yr/:mth', auth, (req, res) => {
	Event.month(Number(req.params.yr), Number(req.params.mth), req.user._id)
		.exec().then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});

router.get('/events/:yr/:mth/:startday', auth, (req, res) => {
	// var days = req.params.days.split('-')
	//var daysStart = days[0], daysEnd = days[1]
	Event.days(Number(req.params.yr), Number(req.params.mth), Number(req.params.startday), Number(req.params.startday), req.user._id)
		.exec().then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});

router.get('/events/:yr/:mth/:startday/:endday', auth, (req, res) => {
	// var days = req.params.days.split('-')
	//var daysStart = days[0], daysEnd = days[1]
	Event.days(Number(req.params.yr), Number(req.params.mth), Number(req.params.startday), Number(req.params.endday), req.user._id)
		.exec().then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});


router.get('/events', auth, function(req, res, next) { //console.log(req.user._id)
	Event.list(req.user._id).exec()
		.then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});

router.post('/events', auth, function(req, res) {
	Event.save(req.body, req.user._id)
		.then((events) => res.status(201).json(events))
		.catch((err) => res.status(400).json(err))
});

router.put('/events/:id', auth, function(req, res) {
	Event.update(req.params.id, req.body).exec()
		.then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});

router.delete('/events/:id', auth, function(req, res) {
	Event.del(req.params.id).exec()
		.then((events) => res.status(200).json(events))
		.catch((err) => res.status(400).json(err))
});

// app.use(function(err, req, res, next) {
//   return res.status(400).json(err);
// });

module.exports = router;
