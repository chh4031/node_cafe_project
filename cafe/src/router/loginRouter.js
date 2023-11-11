const express = require('express');
const router = express.Router();

const loginRouter = require('../controller/loginController');

// 로그인 라우터
router.get("/", loginRouter.loginView);

// 회원가입 라우터
router.get("/register", loginRouter.registerView)

// 로그인 체크 라우터
router.post("/login", loginRouter.loginCheck)

// 회원가입 체크(회원가입 시키는) 라우터
router.post("/newuser", loginRouter.newUser)

// 로그아웃 라우터
router.get("/logout", loginRouter.logoutUser)

module.exports = router;