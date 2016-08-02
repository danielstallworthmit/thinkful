var express = require('express');
var Event = require('../services/event');
var router = express.Router();

// router.get('/:yr', (req, res) => {

// });

router.get('/events', function(req, res, next) {
	Event.list().exec().then((events) => res.status(200).json(events)).catch((err) => res.status(400).json(err))
});

router.post('/events', function(req, res) {
	Event.save(req.body).then((event) => res.status(201).json(event)).catch((err) => res.status(400).json(err))
});

router.put('/events/:id', function(req, res) {
	Event.update(req.params.id, req.body).exec().then((event) => res.status(200).json(event)).catch((err) => res.status(400).json(err))
});

router.delete('/events/:id', function(req, res) {
	Event.del(req.params.id).exec().then((event) => res.status(200).json(event)).catch((err) => res.status(400).json(err))
});

// app.use(function(err, req, res, next) {
//   return res.status(400).json(err);
// });

module.exports = router;
