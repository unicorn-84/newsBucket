const express = require('express');
const path = require('path');
const fs = require('fs');
const sassMiddleware = require('node-sass-middleware');
const nconf = require('nconf');
const helmet = require('helmet');
const checker = require('./middlewares/checker');
const spider = require('./middlewares/spider');

const app = express();

nconf.env().argv().file({ file: path.join(__dirname, 'config.json') });

app.set('trust proxy', true);
app.set('env', nconf.get('env'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(checker);
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  outputStyle: 'compressed',
}));
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(spider);

const index = require('./routes/index');

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
  // set locals, only providing error in development
  response.locals.message = error.message;
  if (app.get('env') === 'production') {
    response.locals.error = {};
    fs.appendFile(path.join(__dirname, 'logs/error.log'), `[${new Date()}]\n${remoteIp}\n${method} ${url} ${error.status}\n\n`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    response.locals.error = error;
  }
  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;

