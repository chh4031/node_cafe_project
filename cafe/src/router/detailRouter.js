const express = require('express');
const router = express.Router();

const detailRouter = require('../controller/detailController');

// 상세보기 라우터
router.get("/:menuNum", detailRouter.detailView)

// 상세보기에서 주문시 라우터
router.post("/order", detailRouter.order)

module.exports = router;