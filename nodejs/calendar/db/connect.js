var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./config');

var events = mongoose.createConnection(config[env].url);

var auth = events.useDb('auth');

exports.events = events
exports.auth = auth