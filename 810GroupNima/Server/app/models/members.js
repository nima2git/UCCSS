var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Bcrypt = require('bcryptjs');

var memberSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ['analyst', 'developer', 'manager'] },
    dateRegistered: { type: Date, default: Date.now },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});


//WILL KEEP GETTING ERROR UNTIL 'UserSchema' is Defined
//Added FROM WEEK 12 - AUTHENTICATION & AUTHORIZATION PP SLIDE 5 & 6
memberSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) {
        Bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

memberSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};



module.exports =
    Mongoose.model('Member', memberSchema);
