var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
    // env = process.env.NODE_ENV || 'production';

var config = {
    // production: {
        root: rootPath,
        app: { name: 'todo' }, //This is where you can name the database
        port: 3300,
        db: 'mongodb://127.0.0.1/todo' //name the extension as well
    // }
};

module.exports = config;
