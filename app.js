const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const config = require('./config');
const helmet = require('helmet');

const app = express();

app.set('env', config.get('env'));

const index = require('./routes/index');

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.disable('view cache');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (app.get('env') === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

