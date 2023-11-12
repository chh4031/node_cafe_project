const express = require('express');
const router = express.Router();

const menuRouter = require('../controller/menuController');

// 메뉴 목록 라우터
router.get("/", menuRouter.menuView);

// 검색 기능 라우터
router.post("/search", menuRouter.searchMenu);

module.exports = router;