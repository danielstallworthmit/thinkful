require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var eventRoutes = require('./routes/event');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', eventRoutes);
app.use('*', function(req, res) {
	res.status(404).json({ message: 'Not Found' });
});

app.listen(process.env.PORT || 3000);

exports.app = app;
