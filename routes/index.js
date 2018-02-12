const fs = require('fs');
const path = require('path');
const express = require('express');
const nconf = require('nconf');

const router = express.Router();

/* GET home page. */
router.get('/', (request, response, next) => {
  const { method, url, headers } = request;
  const remoteIp = headers['x-real-ip'];
  response.render('index', { massMedia: request.specialData });
  if (nconf.get('env') === 'production') {
    fs.appendFile(path.join(__dirname, '../logs/access.log'), `[${new Date()}]\n${remoteIp}\n${method} ${url} ${response.statusCode}\n\n`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});

module.exports = router;
