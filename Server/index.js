//FROM GRUNT PP SLIDE 13, AS PART OF 

var express = require('express');

var app = express();

app.get('/', function(req,res){
	res.send('Hello World!');
});

app.listen(3300);  // This starts the server, using the listen method on port 3300




