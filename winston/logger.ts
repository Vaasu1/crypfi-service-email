import { format, transports, LoggerOptions, createLogger } from 'winston';

const winston = require('winston');
require('winston-mongodb');

const consoleOpts = {
  handleExceptions: true,
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  format: format.combine(
    format.json({ space: 2 }),
    format.colorize({ all: true }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  )
};

const options: LoggerOptions = {
  transports: [
    new transports.Console(consoleOpts),
    new winston.transports.MongoDB({
      db: `mongodb://${process.env.MONGO_HOST_NAME}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DBNAME}_${process.env.DBNAME}`,
      collection: `${process.env.DBNAME}_errors`,
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      level: 'error'
    })
  ]
};

const logger = createLogger(options);
console.log = function (...args) {
  return logger.info(args[0], { metadata: args[1] ?? '' });
};
console.error = function (...args) {
  return logger.error(args[0], { metadata: args[1] ?? '' });
};
console.info = function (...args) {
  return logger.warn(args[0], { metadata: args[1] ?? '' });
};
if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}
export default logger;
