var express = require('express');
var User = require('../services/user');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');

router.get('/hidden', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({
        message: 'Luke... I am your father'
    });
});

var jsonParser = bodyParser.json();

router.post('/users', jsonParser, (req, res) => {
	User.addUser(req.body, function(status, message){
		return res.status(status).json({
                message: message
            });
	})
});

module.exports = router;