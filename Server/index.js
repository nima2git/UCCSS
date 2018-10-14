// //FROM GRUNT PP SLIDE 13, AS PART OF 

// var express = require('express');

// var app = express();

// app.get('/', function(req,res){
// 	res.send('Hello Nima & World!');
// });

// app.listen(3300);  // This starts the server, using the listen method on port 3300







// //FROM GRUNT PP SLIDE 15: CONFIGURE THE PORT
// var express = require('express');

// var app = express();

// app.set('port', process.env.PORT || 3000);

// app.get('/',function(req,res){
// 	res.send('Hello World!');
// });

// app.listen(app.get('port'), function(){
// 	console.log('Express started on http://localhost:' + app.get('port'));
// });





// //FROM GRUNT PP SLIDE 18 MIDDLEWARE
// var http = require('http');
// var express = require('express');

// var app = express();

// app.use(function(req, res, next){
//     console.log('Request from ' + req.ip);
//     next();//Every middleware needs the next to complete the callback or else the request will never end
//   });

//   app.get('/',function(req,res){
// 	res.send('Hello Nima & Middleware World!');
// });

// http.createServer(app).listen(3000, function(){
// 	console.log('Express server listening on port ' + 3000);
// })





// // FROM EXPRESS PP SLIDE 19 MIDDLEWARE WITHOUT THE next();
// //Every middleware needs the next to complete the callback or else the request will never end as 
// //the client never gets a call back for their request.
// var http = require('http');
// var express = require('express');

// var app = express();

// app.use(function(req, res){
//   console.log('Request from ' + req.ip);
//   //Every middleware needs the next to complete the callback or else the request will never end as 
//   //the client never gets a call back for their request.
// });

// app.get('/',function(req,res){
// 	res.send('Hello World!');
// });

// http.createServer(app).listen(3000, function(){
// 	console.log('Express server listening on port ' + 3000);
// })






var http = require('http');
var express = require('express');

var app = express();

app.use(function(req, res, next){
    console.log('Request from ' + req.ip);
    next();//Every middleware needs the next to complete the callback or else the request will never end
  });

  app.get('/',function(req,res){
	res.send('Hello Nima & Middleware World!');
});

app.get('/about/directions', function(req, res){  //THE MORE SPECIFIC ROUTE NEEDS TO COME FIRST 
	res.send('How to Find Us!');                //EXAMPLE: /ABOUT GOES AFTER /ABOUT/DIRECTIONS
});

  app.get('/about', function(req, res){  //THIS WILL ADD MORE ROUTES TO YOUR URL TO A DIFFERENT PAGE
	res.send('About Us!');              //SENDS BACK PAGE FOR 'ABOUT US!'
});


// WE USE THIS MIDDLEWARE CALLBACK IF THE REQUEST FROM ABOVE WAS NOT COMPLETED
//SO WE PUT IT AFTER THE APP.GET() FUNCTION
app.use(function(req, res){
	res.type('text/plan');
	res.status(404);
	res.send('404 NIMA YOUR page Not Found (404 - problem with your request');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plan');
	res.status(500);
	res.send('500 Sever Error');
});

http.createServer(app).listen(3000, function(){
	console.log('Express server listening on port ' + 3000);
})

