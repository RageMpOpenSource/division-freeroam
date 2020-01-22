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

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format:'HH:mm:ss DD-MM-YYYY'}),
        winston.format.json(),
        myFormat
    ),
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