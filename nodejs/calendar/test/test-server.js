var chai = require('chai');
var expect = require('chai').expect
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../index.js');
var Event = require('../models/event');
var User = require('../models/user');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

// + It should return Unauthorized for all actions if not a logged in user

// On login:
// It should get all items on get from /events
// It should add an event on post to /events
// It should edit edit an item on put to /events/:id
// It should delete an item on delete to /events/:id

// It should not be able to create a username that already exists
// {
//   "message": "User save Internal server error"
// }
// It should create a new user on post to /users

// It should only create/edit/delete events for logged in user, not other users
// It should return 404 for events that do not exist on get/put/delete
// It should not allow an event start date to be after the end date
// It should create year, month, day, hour, minute for start and end dates
// It should associate an event with a user

describe('Events', function() {
	before(function(done) {
		seed.eventsCreate(function(){
			done();
		});
		seed.usersCreate(function(){
			done();
		});
	});
	var id3 = '';

	it('should return Unauthorized if not a logged in user on get', function(done){
		chai.request(app).get('/events')
			.end(function(err,res){
				res.should.have.status(401);
				res.error.text.should.equal('Unauthorized');
				Object.keys(res.body).length.should.equal(0);
				//res.body.length.should.equal(1);
				// res.body[0].should.be.a('object');
				// res.body[0].should.have.property('_id');
				// res.body[0].should.have.property('name');
				// res.body[0]._id.should.be.a('string');
				// res.body[0].name.should.be.a('string');
				//res.body[0].name.should.equal('Broad Beans');
				//res.body[1].name.should.equal('Tomatoes');
				//res.body[2].name.should.equal('Peppers');
				done();
			});
	});
	it('should return Unauthorized if not a logged in user on post',function(done){
		chai.request(app).post('/events')
			.send({"summary": "Eating dinner", "start": "2016-08-10 05:30:00", "end": "2016-08-10 07:30:00", "timeZone": "America/Chicago"})
			.end(function(err,res){
				res.should.have.status(401);
				res.error.text.should.equal('Unauthorized');
				Object.keys(res.body).length.should.equal(0);
			});
		chai.request(app).get('/events')
			.end(function(err, res) {
				res.should.have.status(401);
				res.error.text.should.equal('Unauthorized');
				Object.keys(res.body).length.should.equal(0);
				done();
			});
	});
	it('should return Unauthorized if not a logged in user on edit of an event on put',function(done){
		chai.request(app).put('/events/' + 1)
			.send({"summary": "Eating dinner", "start": "2016-08-10 05:30:00", "end": "2016-08-10 07:30:00", "timeZone": "America/Chicago"})
			.end(function(err,res){
				res.should.have.status(401);
				res.error.text.should.equal('Unauthorized');
				Object.keys(res.body).length.should.equal(0);
			});
		chai.request(app).get('/events')
			.end(function(err, res) {
				res.should.have.status(401);
				res.error.text.should.equal('Unauthorized');
				Object.keys(res.body).length.should.equal(0);
				done();
			});

	});
	it('should return Unauthorized if not a logged in user on delete',function(done){
		chai.request(app).delete('/events/' + 1)
			.end(function(err,res){
				res.should.have.status(401);
				res.error.text.should.equal('Unauthorized');
				Object.keys(res.body).length.should.equal(0);
			});
		chai.request(app).get('/events')
			.end(function(err, res) {
				res.should.have.status(401);
				res.error.text.should.equal('Unauthorized');
				Object.keys(res.body).length.should.equal(0);
				done();
			});

	});
	
	
	
	after(function(done) {
		Event.remove(function() {
			done();
		});
		User.remove(function() {
			done();
		});
	});
});
