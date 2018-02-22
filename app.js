const express = require('express');
const path = require('path');
const fs = require('fs');
const sassMiddleware = require('node-sass-middleware');
const nconf = require('nconf');
const helmet = require('helmet');
const checker = require('./middlewares/checker');
const db = require('./middlewares/db');

const app = express();
const index = require('./routes/index');

nconf.env().argv().file({ file: path.join(__dirname, 'config.json') });

app.set('trust proxy', true);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(checker);
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  outputStyle: 'compressed',
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(db);
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, request, response, next) => {
  const { method, url, headers } = request;
  const remoteIp = headers['x-real-ip'];
  response.statusCode = error.status || 500;
  fs.appendFile(path.join(__dirname, 'logs/error.log'), `[${new Date()}]\n${remoteIp}\n${method} ${url} ${response.statusCode}\n${error}\n\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
  response.sendStatus(response.statusCode);
});

module.exports = app;

