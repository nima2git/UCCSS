var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
HelpTicket = mongoose.model('HelpTicket'),
    HelpTicketContent = mongoose.model("HelpTicketContent")
asyncHandler = require('express-async-handler'),
    passport = require('passport'),
    multer = require('multer'), //from Week 13 file uploads slide 3, we do npm install multer & mkdirp then
    mkdirp = require('mkdirp'); //require it on this file


var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);




    //THIS IS FROM WEEK 8 HELP TICKET API
    //GET ALL HELP TICKETS
    router.get('/helpTickets', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all HelpTickets');
        let query = HelpTicket.find();
        query
            .sort(req.query.order)
            .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })
            .populate({ path: 'ownerId', model: 'User', select: 'lastName firstName fullName' });

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



    //UPDATE A HELP TICKET
    router.put('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating HelpTicket');
        console.log(req.body)
        await HelpTicket.findOneAndUpdate({ _id: req.body.helpTicket._id }, req.body.helpTicket, { new: true })
            .then(result => {
                if (req.body.content) {
                    req.body.content.helpTicketId = result._id;
                    var helpTicketContent = new HelpTicketContent(req.body.content);
                    helpTicketContent.save()
                        .then(content => {
                            res.status(201).json({contentID: content._id});
                        })
                } else {
                    res.status(200).json(result);
                }
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

    //CREATE A HELP TICKET
    router.post('/helpTickets', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating HelpTicket');
        var helpTicket = new HelpTicket(req.body.helpTicket);
        console.log(helpTicket)
        await helpTicket.save()
            .then(result => {
                req.body.content.helpTicketId = result._id;
                var helpTicketContent = new HelpTicketContent(req.body.content);
                helpTicketContent.save()
                    .then(content => {
                        res.status(201).json({contentID: content._id});
                    })
            })
    }));


    router.get('/helpTicketContents/helpTicket/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Getting a HelpTickets Content');
        let query = HelpTicketContent.find({ helpTicketId: req.params.id })
            .sort('-dateCreated')
            .populate({ path: 'personId', model: 'User', select: 'lastName firstName fullName' })

        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));



//This code block from week 13 file uploads slide 3
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = config.uploads + '/helpTickets';
        mkdirp(path, function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                cb(null, path);
            }
        });
    },
    filename: function (req, file, cb) {
        file.fileName = file.originalname;
        cb(null, file.fieldname + '-' + Date.now());
    }
});


var upload = multer({ storage: storage });


router.post('/helpTicketContents/upload/:id', upload.any(), asyncHandler(async (req, res) => {
    logger.log('info', 'Uploading files');
    await HelpTicketContent.findById(req.params.id).then(result => {
        for (var i = 0, x = req.files.length; i < x; i++) {
            var file = {
                originalFileName: req.files[i].originalname,
                fileName: req.files[i].filename
            };
            result.file = file;
        }
        result.save().then(result => {
            res.status(200).json(result);
        });
    })
}));

};

