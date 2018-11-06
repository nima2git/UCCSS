// var winston = require('winston');
// require('winston-daily-rotate-file');

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     //GET RID OF THIS CODE BELOW WITH 'transports' SO LOGGER DOESN'T LOG TO FILES
//     // transports: [
//     //     new (winston.transports.DailyRotateFile)({
//     //         level: 'error',
//     //         filename: 'log/error-%DATE%.log',
//     //         datePattern: 'YYYY-MM-DD-HH',
//     //         zippedArchive: true,
//     //         maxSize: '20m',
//     //         maxFiles: '14d'
//     //     }),

//     //     new (winston.transports.DailyRotateFile)({
//     //         filename: 'log/application-%DATE%.log',
//     //         datePattern: 'YYYY-MM-DD-HH',
//     //         zippedArchive: true,
//     //         maxSize: '20m',
//     //         maxFiles: '14d'
//     //     })
//     // ]
// });

// //THIS PART MAKES IT SO LOGGER ONLY LOGS TO CONSOLE
// logger.add(new winston.transports.Console({
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.splat(),
//         winston.format.simple()
//     )
// }));





// module.exports = logger;



var winston = require('winston');
require('winston-daily-rotate-file');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //THIS REMOVES THE LOGGING TO THE ERROR LOG FILE
        // new (winston.transports.DailyRotateFile)({
        //     level: 'error',
        //     filename: 'log/error-%DATE%.log',
        //     datePattern: 'YYYY-MM-DD-HH',
        //     zippedArchive: true,
        //     maxSize: '20m',
        //     maxFiles: '14d'
        //     }),
        
            new (winston.transports.DailyRotateFile)({
            filename: 'log/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
           })
        ]
    });
    
if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.splat(),
            winston.format.simple()
                )
            }));
        }

        

     
module.exports = logger;
