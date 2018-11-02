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

module.exports = app;