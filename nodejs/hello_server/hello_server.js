var express = require('express');
var app = express();

app.get('/', function(request, response){
	response.json({
        	name: 'Kim Gordon',
        	instrument: 'Bass'
    	});
	//response.send("Hello World");
});

app.get('/jedi/:firstname/:lastname',function(request,response){
	var first = request.params.firstname;
	var last = request.params.lastname;
	response.send("Hello "+last.substr(0,3)+first.substr(0,2))
});

app.get('/headers',function(request,response){
	response.send(request.headers);
});

app.get('/headers/:header_name',function(request,response){
	var head_name = request.params.header_name
	response.send(request.headers[head_name]);
});

app.get('/version',function(request,response){
	response.send(request.httpVersion);
});




app.listen(3000);
//app.listen(process.env.PORT, process.env.IP);
