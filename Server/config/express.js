var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var glob = require('glob');

var mongoose = require('mongoose');
var bluebird = require('bluebird');

module.exports = function (app, config) {

  //ADDED FROM 'FIRST STEPS WITH MONGOOSE' PP, SLIDE 22
  logger.log('info', "Loading Mongoose functionality");
  mongoose.Promise = bluebird;
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });



  // app.use(function (req, res, next) {
  //   logger.log('info', 'Request from ' + req.connection.remoteAddress);
  //   next();
  // });
  // app.use(morgan('dev'));



  //THIS CODE BELOW IS THE SAME AS THE ONE ABOVE, WE ARE JUST ADDING THE IF STATEMENT SO THAT
  //THE SYSTEM DOESNT LOG WHEN IN TESTING ENVIRONMENT
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));

    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
      logger.log('info', 'Mongoose connected to the database');
    });

    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }




  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(express.static(config.root + '/public'));


  //This portion of code makes it so it gets called before the data is returned back to users in the next block
  //of code
  
  // var users = [{ name: 'John', email: 'woo@hoo.com' },
  // { name: 'Betty', email: 'loo@woo.com' },
  // { name: 'Hal', email: 'boo@woo.com' }
  // ];

  // app.get('/api/users', function (req, res) {
  //   res.status(200).json(users);
  // });






  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config);
  });








  //From Express routing PP, slide 5
  app.get('/willwork',
    function (req, res, next) {
      res.set('X-One', 'One');
      next();
    },
    function (req, res, next) {
      res.set('X-Two', 'Two');
      next();
    },
    function (req, res) {
      res.send("Three");
    }
  );







  app.use(function (req, res) {
    logger.log('error', 'File not found');
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  logger.log('info', "Starting application");

};
