const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);

const app = express();


// 세션 DB 설정
const options = {
  host : "localhost",
  user : 'root',
  password : '0000',
  port : 15628,
  database : 'cafeproject'
}

let sessionStore = new MySQLStore(options);

app.use(session({
  secret : "20191598", // 세션보호 비밀키
    resave : false, // 세션 저장 여부 보통 false
    saveUninitialized : true, // 초기화되지 않은 세션 저장 여부 보통 true
    store : sessionStore, // DB 설정으로
    cookie : {
      maxAge : 3600000, // 세션 초기화 1시간
      httpOnly : true // 자바스크립트에서 쿠키접근 제한
    }
}))


// 라우터 경로 설정
const gotoMain = require('./src/router/mainRouter'); // 메인화면
const gotoLogin = require('./src/router/loginRouter'); // 로그인과 회원가입 화면 공통 사용
const gotoMenu = require('./src/router/menuRouter'); // 메뉴화면
const gotoDetial = require('./src/router/detailRouter'); // 상세보기 화면
const gotoBusket = require('./src/router/busketRouter'); // 장바구니 화면
const gotoMypage = require('./src/router/mypageRouter'); // 마이페이지 화면
const gotoAdmin = require('./src/router/adminRouter'); // 관리자 화면


// view engine setup, 프론트 부분 경로 설정
app.set('views', path.join(__dirname, '/src/page'));
app.set('view engine', 'ejs');

// 건들필요없는 부분들
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/style')));

// 라우터 경로 주소 지정
app.use('/', gotoMain); // 메인화면
app.use('/moveLogin', gotoLogin); // 로그인과 회원가입 화면 공통 사용
app.use('/moveMenu', gotoMenu); // 메뉴화면
app.use('/moveDetail', gotoDetial); // 상세보기 화면
app.use('/moveBusket', gotoBusket); // 장바구니 화면
app.use('/moveMypage', gotoMypage); // 마이페이지 화면
app.use('/moveAdmin', gotoAdmin); // 관리자 화면

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

module.exports = app;
