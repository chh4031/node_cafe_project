const express = require('express');
const router = express.Router();

const mypageRouter = require('../controller/mypageController');

// 마이페이지 라우터
router.get("/", mypageRouter.mypageView);

module.exports = router;