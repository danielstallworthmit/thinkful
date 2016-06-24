var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var expect = chai.expect;
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List',function(){
	it('should list items on get',function(done){
		chai.request(app).get('/items')
			.end(function(err,res){
				should.equal(err,null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				Object.keys(res.body).should.have.length(3);
				res.body[0].should.be.a('object');
				res.body[0].should.have.property('id');
				res.body[0].should.have.property('name');
				res.body[0].id.should.be.a('number');
				res.body[0].name.should.be.a('string');
				res.body[0].name.should.equal('Broad beans');
				res.body[1].name.should.equal('Tomatoes');
				res.body[2].name.should.equal('Peppers');
				done();
			});
	});
	it('should add an item on post',function(done){
		chai.request(app).post('/items')
			.send({'name':'Kale'})
			.end(function(err,res){
				should.equal(err,null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				Object.keys(storage.items).should.have.length(4);
				res.body.should.have.property('name');
				res.body.should.have.property('id');
				res.body.id.should.be.a('number');
				res.body.name.should.be.a('string');
				res.body.name.should.equal('Kale');
				storage.items.should.be.a('object');
				storage.items[3].should.be.a('object');
				storage.items[3].should.have.property('id');
				storage.items[3].should.have.property('name');
				storage.items[3].id.should.be.a('number');
				storage.items[3].name.should.equal('Kale');
				storage.items[3].name.should.be.a('string');
				done();
			});
	});
	it('should edit an item of put',function(done){
		chai.request(app).put('/items/3')
			.send({'name':'Extra Healthy Kale','id':3})
			.end(function(err,res){
				should.equal(err,null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				Object.keys(storage.items).should.have.length(4);
				res.body.should.have.property('name');
				res.body.should.have.property('id');
				res.body.id.should.be.a('number');
				res.body.name.should.be.a('string');
				res.body.name.should.equal('Extra Healthy Kale');
				storage.items.should.be.a('object');
				storage.items[3].should.be.a('object');
				storage.items[3].should.have.property('id');
				storage.items[3].should.have.property('name');
				storage.items[3].id.should.be.a('number');
				storage.items[3].name.should.equal('Extra Healthy Kale');
				storage.items[3].name.should.be.a('string');
				done();
			});
	});
	it('should delete and item on delete',function(done){
		chai.request(app).delete('/items/3')
			.end(function(err,res){
				should.equal(err,null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				Object.keys(storage.items).should.have.length(3);
				res.body.should.have.property('name');
				res.body.should.have.property('id');
				res.body.id.should.be.a('number');
				res.body.name.should.be.a('string');
				res.body.name.should.equal('Extra Healthy Kale');
				storage.items.should.be.a('object');
				expect(storage.items[3]).to.be.undefined;
				done();
			});
	});
	it('should add item on put if id does not exist',function(done){
		chai.request(app).put('/items/100')
			.send({'name':'Kale','id':100})
			.end(function(err,res){
				should.equal(err,null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				Object.keys(storage.items).should.have.length(4);
				res.body.should.have.property('name');
				res.body.should.have.property('id');
				res.body.id.should.be.a('number');
				res.body.name.should.be.a('string');
				res.body.name.should.equal('Kale');
				storage.items.should.be.a('object');
				storage.items[100].should.be.a('object');
				storage.items[100].should.have.property('id');
				storage.items[100].should.have.property('name');
				storage.items[100].id.should.be.a('number');
				storage.items[100].name.should.equal('Kale');
				storage.items[100].name.should.be.a('string');
				done();
			});
	});
	it('should not delete anything if id does not exist',function(done){
		chai.request(app).delete('/items/200')
			.end(function(err,res){
				should.equal(err,null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.empty;
				Object.keys(storage.items).should.have.length(4);
				storage.items.should.be.a('object');
				expect(storage.items[200]).to.be.undefined;
				done();
			});
	});
});