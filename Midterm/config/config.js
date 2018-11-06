// var path = require('path'),
//     rootPath = path.normalize(__dirname + '/..');
//     // env = process.env.NODE_ENV || 'production';

// var config = {
//     // production: {
//         root: rootPath,
//         app: { name: 'Todo' },  
//         port: 3300,
//         db: 'mongodb://127.0.0.1/todo' //THIS IS WHERE YOU NAME YOUR DATABASE 'todo'
//     // }
// };

// module.exports = config;


var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'foobar' },
        port: 3300,
        db: 'mongodb://127.0.0.1/foobar-dev'
    },
    // test: {
    //     root: rootPath,
    //     app: { name: 'UCCSS' },
    //     port: 4000,
    //     db: 'mongodb://127.0.0.1/helpMe-test'
    // },

    production: {
        root: rootPath,
        app: { name: 'foobar' },
        port: 80,
        db: 'mongodb://127.0.0.1/foobar'
    }
};

module.exports = config[env];