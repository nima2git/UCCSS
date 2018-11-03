var express = require('express');
var config = require('./Configuration/config');  // not a node module so we have to add the path
var logger = require('./Configuration/logger')  //calls the code in folder Configuration/logger
console.log(config)
var app = express();
var port = process.env.port || 3500;

require('./Configuration/express')(app, config);  //calls the code in folder Configuration/express

require('http').createServer(app).listen(port, function () {
    logger.log('info', "HTTP Server listening on port: %d, in %s mode", config.port, app.get('env'));
});

module.exports = app;