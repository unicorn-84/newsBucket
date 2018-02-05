const { createLogger, format, transports } = require('winston');
const config = require('../config');
const path = require('path');

const { timestamp } = format;

const log = createLogger({
  format: format.combine(
    timestamp(),
    format.simple(),
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../access.log'),
      level: 'info',
    }),
    new transports.File({
      filename: path.join(__dirname, '../error.log'),
      level: 'warn',
    }),
  ],
});

if (config.get('env') !== 'production' || config.get('NODE_ENV') !== 'production') {
  log.add(new transports.Console({
    level: 'debug',
  }));
}

module.exports = log;
