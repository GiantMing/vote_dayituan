'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');



// routes
const index = require('./routes/index');
const work = require('./routes/work');
const vote  = require('./routes/vote');

// app 做为 vote_dayituan_2016的子路由
const vote_dayituan_2016 = express();
const app = express();

// 将 app 挂载到 /vote_dayituan_2016路由下
vote_dayituan_2016.use('/vote_dayituan_2016', app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'hello world', cookie: { maxAge: 60000 }}))
app.use(express.static(path.join(__dirname, 'public')));

// 主页
app.use('/', index);

// 作品 POST 路由
app.use('/work', work);

// 投票
app.use('/vote', vote);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = vote_dayituan_2016;
