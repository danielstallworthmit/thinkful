var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function(){
	this.items = {};
	this.id = 0;
};

Storage.prototype.add = function(name){
	var item = {'name': name, 'id': this.id};
	this.items[this.id] = item;
	this.id += 1;
	return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req,res){
	res.json(storage.items);
});

app.post('/items',jsonParser,function(req,res){
	if(!req.body){
		return res.sendStatus(400);
	}

	var item = storage.add(req.body.name);
	res.status(201).json(item);
});

app.delete('/items/:id',function(req,res){
	var id = req.params.id;
	try{
		res.status(200).json(storage.items[id]);
		delete storage.items[id];
	}
	catch(err){
		//assert(err.arguments[0],'doesNotExist');
		res.json(err.arguments[0]);
	}
});

app.put('/items/:id',jsonParser,function(req,res){
	if(!req.body){
		return res.sendStatus(400);
	}

	try{
		var id = Number(req.params.id);
		storage.items[id].name = req.body.name;
		res.status(200).json(storage.items[id]);
	}
	catch(err){
		var item = {'name': req.body.name, 'id': id}; //storage.add(req.body.name);
		storage.items[id] = item;
		res.status(201).json(item);
	}
});

app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;
