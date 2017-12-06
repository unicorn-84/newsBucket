const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config');

const app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

app.use((req, res, next) => {
  if (req.url === '/') {
    res.send('<h1>NewsBucket</h1>');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.url === '/test') {
    res.send('<h3>Test</h3>');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (app.get('env') === 'development') {
    res.status(error.status || 500);
    res.send(`<h1>${error.message}</h1><h3>${error.status}</h3><h4>${error.stack}</h4>`);
  }
});

/*
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var users = require('./routes/users');*/

/*// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);




module.exports = app;*/

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.send(`${res.locals.message}\n${res.locals.error}`);
// });
