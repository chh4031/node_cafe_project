const express = require('express');
const router = express.Router();

const busketRouter = require('../controller/busketController');

// 장바구니 라우터
router.get("/", busketRouter.busketView);

// 장바구니 수량수정, 삭제, 주문하기, 취소하기 선택해서 구동되는 라우터
router.post("/order", busketRouter.busketOption)

module.exports = router;