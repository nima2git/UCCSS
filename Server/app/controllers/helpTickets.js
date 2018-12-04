var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
User = mongoose.model('User'),
    asyncHandler = require('express-async-handler'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    //THIS IS FROM WEEK 8 HELP TICKET API
    //GET ALL HELP TICKETS
    router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();
        query.sort(req.query.order)
        if (req.query.status) {
            if (req.query.status[0] == '-') {
                query.where('status').ne(req.query.status.substring(1));
            } else {
                query.where('status').eq(req.query.status);
            }
        }
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    //HELP TICKET API PP, SLIDE 7 -nima lendey
    //GETS A HELP TICKET.  POPULATES OWNERID & PERSONID
    router.get('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get a helpTicket', req.params.id);
        await HelpTicket.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    //CREATE A HELP TICKET
    router.post('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Creating a help ticket');
        var HelpTicket = new User(req.body);
        await HelpTicket.save()
            .then(result => {
                res.status(201).json(result);
            })

    }));

    //UPDATE A HELP TICKET
    router.put('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Updating a help ticket');
        await HelpTicket.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));


    //DELETE A HELP TICKET
    router.delete('/helpTickets/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting user %s', req.params.id);
        await HelpTicket.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));


};

