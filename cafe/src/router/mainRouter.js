const express = require('express');
const router = express.Router();

const mainRouter = require('../controller/mainController');

// 메인화면 라우터
router.get("/", mainRouter.mainView);

module.exports = router;