const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const config = require('./config');
const helmet = require('helmet');
const spider = require('./modules/spider');

const app = express();

app.set('env', config.get('env'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

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
  outputStyle: 'compressed',
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
// app.use(spider);

app.use('/', (req, res, next) => {
  res.locals.news = [{ 'id':54,'brand':'Фонтанка','url':'http://www.fontanka.ru','color':'#ee8d39','title':'\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\tНиколай Цехомский: В нашей новой стратегии нет спортивных сооружений\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t','link':'http://www.fontanka.ru/2018/02/09/052/','image':'\n\nhttp://cdn.fontanka.ru/mm/items/2018/2/9/0033/photo_2018-02-09_12-03-44.jpg'},{'id':46,'brand':'Фонтанка','url':'http://www.fontanka.ru','color':'#ee8d39','title':'\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t«Унизить Россию невозможно». Как в Петербурге встретили Олимпиаду\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t','link':'http://www.fontanka.ru/2018/02/09/050/','image':'\n\nhttp://cdn.fontanka.ru/mm/items/2018/2/9/0027/NIK_4102.jpg'},{'id':10,'brand':'Фонтанка','url':'http://www.fontanka.ru','color':'#ee8d39','title':'\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\tКуда пойти 9-11 февраля: 3D-шоу Kraftwerk, «звездные» джинсы, лекция Черниговской, фотографии в электродепо\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t','link':'http://www.fontanka.ruhttp://calendar.fontanka.ru/articles/6049/','image':'\n\nhttp://cdn.fontanka.ru/mm/items/2018/2/8/0171/NIK_3990.jpg'},{'id':26,'brand':'Фонтанка','url':'http://www.fontanka.ru','color':'#ee8d39','title':'\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\tЧиновников послали на «Грозу»\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t','link':'http://www.fontanka.ru/2018/02/08/139/','image':'\n\nhttp://cdn.fontanka.ru/mm/items/2018/2/8/0150/gr.jpg' }];
  res.render('index');
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

