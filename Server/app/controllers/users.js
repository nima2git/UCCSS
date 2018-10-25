//from Express routing pp, slide 11: Respond to user
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');



module.exports = function (app, config) {
    app.use('/api', router);            // the '/api' adds an api to every URL that gets passed in

    router.route('/users').get(function (req, res, next) {
        logger.log('info', 'Get all users');
        res.status(200).json({ message: 'Get all users' });
    });

//gotten from Express Routing PP, slide 14, except it is reformated to look like the route above this one
    router.route('/users/:id').get(function (req, res, next) {  
        logger.log('info', 'Get user %s', req.params.id); 
        res.status(200).json({ message: 'Get user ' + req.params.id });
    });

   
    router.route('/login').post(function (req, res, next) {
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;

        var obj = {'email' : email, 'password' : password };
    res.status(201).json(obj);
    });


};
