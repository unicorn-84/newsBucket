const fs = require('fs');
const path = require('path');
const nconf = require('nconf');

module.exports = (request, response, next) => {
  const { method, url, headers } = request;
  const remoteIp = headers['x-real-ip'];
  if (method !== 'HEAD' && method !== 'GET') {
    if (nconf.get('env') === 'production') {
      fs.appendFile(path.join(__dirname, '../../logs/error.log'), `[${new Date()}]\n${remoteIp}\n${method} ${url} 405\n\n`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
    const error = new Error('Method Not Allowed');
    error.status = 405;
    next(error);
  }
  next();
};
