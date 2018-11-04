//EXPRESS.JS PP SLIDE 32 (LAST SLIDE)
var express = require('express');
var config = require('./config/config');  // not a node module so we have to add the path
var logger = require('./config/logger')
console.log(config)
var app = express();
var port = process.env.port || 3300;

require('./config/express')(app, config);

require('http').createServer(app).listen(port, function () {
    logger.log('info', "HTTP Server listening on port: %d, in %s mode", config.port, app.get('env'));
});

//From unit testing PP, slide 10
//This makes the express object available to the test module so it can access the app's api
module.exports = app;
