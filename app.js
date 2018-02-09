const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const nconf = require('nconf');
const helmet = require('helmet');
const checker = require('./middlewares/checker');
const spider = require('./middlewares/spider');

nconf.env().argv().file({ file: path.join(__dirname, 'config.json') });

const app = express();

app.set('env', nconf.get('env'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
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
app.use(spider);

app.use('/', (request, response, next) => {
  response.render('index', { massMedia: request.specialData });
});

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

