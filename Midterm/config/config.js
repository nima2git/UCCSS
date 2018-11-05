var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
    // env = process.env.NODE_ENV || 'production';

var config = {
    // production: {
        root: rootPath,
        app: { name: 'Todo' },  
        port: 3300,
        db: 'mongodb://127.0.0.1/todo' //THIS IS WHERE YOU NAME YOUR DATABASE 'todo'
    // }
};

module.exports = config;
