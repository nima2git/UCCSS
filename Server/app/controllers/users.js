//from Express routing pp, slide 11: Respond to user
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
User = mongoose.model('User'),
    asyncHandler = require('express-async-handler');




module.exports = function (app, config) {
    app.use('/api', router);            // the '/api' adds an api to every URL that gets passed in

    router.get('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all users');
        let query = User.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));


    //gotten from Express Routing PP, slide 14, except it is reformated to look like the route above this one
    router.get('/users/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get user %s', req.params.id);
        await User.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));



    // router.route('/users').post(function (req, res, next) {
    //     logger.log('info', 'Create User');
    //     var user = new User(req.body);
    //     user.save()
    //         .then(result => {
    //             res.status(201).json(result);
    //         })
    //         .catch(err => {
    //             return next(err);
    //         });
    // });

    //REPLACING CODE ABOVE IN PLACE OF CODE BLOCK BELOW TO SHOW MONGOOSE PP SLIDE 32 "ASYNC/AWAIT POST HANDLER"
    router.post('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating user');
        var user = new User(req.body);
        await user.save()
            .then(result => {
                res.status(201).json(result);
            })

    }));

    router.put('/users', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating user');
        await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));


    router.delete('/users/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting user %s', req.params.id);
        await User.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));



};
