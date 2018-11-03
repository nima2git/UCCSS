var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
    // env = process.env.NODE_ENV || 'production';

var config = {
    // production: {
        root: rootPath,
        app: { name: 'Todo' },
        port: 3500,
        db: 'mongodb://127.0.0.1/todo' 
    // }
};

module.exports = config;
