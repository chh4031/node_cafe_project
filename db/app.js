const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const gotoMain= require('./src/router/rMain');
const gotoMenu = require('./src/router/rMenu');
const gotoRegister = require('./src/router/rRegister');
const gotoLogin = require('./src/router/rLogin');


// 건들지 ~
// view engine setup
app.set('views', path.join(__dirname,'/src/page'));
// 프론트 경로 재설정
app.set('view engine', 'ejs');
// 탬플릿 엔진 설정

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// ejs에 css 추가를 위한 구문
app.use(express.static("./src/style/"));

app.use('/', gotoMain);
app.use('/pMenu', gotoMenu);
app.use('/pRegister', gotoRegister)
app.use('/pLogin', gotoLogin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// ~ 마라

module.exports = app;
