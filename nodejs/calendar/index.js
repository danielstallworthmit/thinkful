require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var eventRoutes = require('./routes/event');
var userRoutes = require('./routes/user');
var User = require('./services/user');
var BasicStrategy = require('passport-http').BasicStrategy;
var passport = require('passport');
var app = express();

var strategy = new BasicStrategy(function(username, password, callback) {
    User.setStrategy(username, password, callback)
});

passport.use(strategy);

app.use(passport.initialize());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', eventRoutes);
app.use('/', userRoutes);
app.use('*', function(req, res) {
	res.status(404).json({ message: 'Not Found' });
});

app.listen(process.env.PORT || 3000);

exports.app = app;
