var express = require('express');
var Event = require('../services/event');
var router = express.Router();

router.get('/events', function(req, res) {
	Event.list(function(err, events) {
		if(err) {
			return res.status(400).json(err);
		}
		res.json(events);
	});
});

router.post('/events', function(req, res) {
	Event.save(req.body, function(err, event) {
		if(err) {
			return res.status(400).json(err);
		}
		res.status(201).json(event);
	});
});

router.put('/events/:id', function(req, res) {
	Event.update(req.params.id, req.body, function(err, event) {
		if(err) {
			return res.status(400).json(err);
		}
		res.status(200).json(event);
	});
});

router.delete('/events/:id', function(req, res) {
	Event.del(req.params.id, function(err, event) {
		if(err) {
			return res.status(400).json(err);
		}
		res.status(200).json(event);
	});
});

module.exports = router;
