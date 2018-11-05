var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var todoSchema = new Schema({
    Todo: { type: String, require: true },
    Priority: { type: String, require: true, enum:['Critical','High','Medium','Low']},
    DateDue: { type: Date, default: Date.now}
});


module.exports =
    Mongoose.model('todo', todoSchema);