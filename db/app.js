const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);

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

// 세션 DB 설정
const options = {
  host : "localhost",
  user : 'root',
  password : '0000',
  port : 15628,
  database : 'cafedatabase'
};

let sessionStore = new MySQLStore(options);

// 세션 정의, DB랑 연동해서 쓸거 => 메모리 쓰면 중간에 날라가버림
app.use(session({
    secret : "20191598", // 세션보호 비밀키
    resave : false, // 세션 저장 여부 보통 false
    saveUninitialized : true, // 초기화되지 않은 세션 저장 여부 보통 true
    store : sessionStore, // DB 설정으로
    cookie : {
      maxAge : 3600000, // 세션 초기화 1시간
      httpOnly : true // 자바스크립트에서 쿠키접근 제한
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// ejs에 css 추가를 위한 구문
app.use(express.static(path.join(__dirname, "./src/style")));

// 경로지정(건들여도됨)
app.use('/', gotoMain);
app.use('/moveMenu', gotoMenu);
app.use('/moveRegister', gotoRegister)
app.use('/moveLogin', gotoLogin);

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
