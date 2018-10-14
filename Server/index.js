// //FROM GRUNT PP SLIDE 13, AS PART OF 

// var express = require('express');

// var app = express();

// app.get('/', function(req,res){
// 	res.send('Hello Nima & World!');
// });

// app.listen(3300);  // This starts the server, using the listen method on port 3300







//FROM GRUNT PP SLIDE 15: CONFIGURE THE PORT
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/',function(req,res){
	res.send('Hello World!');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port'));
});





// //FROM GRUNT PP SLIDE 18 MIDDLEWARE
// var http = require('http');
// var express = require('express');

// var app = express();

// app.use(function(req, res, next){
//   console.log('Request from ' + req.ip);
//   next();  //Every middleware needs the next to complete the callback or else the request will never end
// });

// app.get('/',function(req,res){
// 	res.send('Hello Nima & Middleware World!');
// });

// http.createServer(app).listen(3000, function(){
// 	console.log('Express server listening on port ' + 3000);
// })

