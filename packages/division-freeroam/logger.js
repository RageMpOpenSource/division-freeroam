/**
 *  Logging levels used
 *  error: 0
 *  warn: 1
 *  info: 2
 *  verbose: 3
 *  debug: 4
 *  silly: 5
 */

const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'info' }),   //  Put the highest level you want to log
        new winston.transports.File({
            filename: 'logs/combined.log',
            level: 'info'
          }),
          new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error'
          })
    ]
});

module.exports = logger;