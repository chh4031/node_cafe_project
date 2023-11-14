const express = require('express');
const router = express.Router();

const adminRouter = require('../controller/adminController');

// 관리자 라우터
router.get("/", adminRouter.adminView);

// 관리자가 공급업체에 재료 주문시 라우터
router.post("/order", adminRouter.companyOrder)

// 관리자가 특별메뉴 바꿀 때 쓰는 라우터
router.post("/good", adminRouter.goodMenu)

module.exports = router;