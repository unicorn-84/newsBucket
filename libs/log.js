const winston = require('winston');
const config = require('../config');

function getLogger(module) {
  const path = module.filename.split('\\').slice(-2).join('\\');
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: config.get('env') === 'development' ? 'debug' : 'error',
        label: path,
      }),
    ],
  });
}

module.exports = getLogger;
