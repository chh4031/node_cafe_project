const express = require('express');
const router = express.Router();

const adminRouter = require('../controller/adminController');

// 관리자 라우터
router.get("/", adminRouter.adminView);

// 관리자가 공급업체에 재료 주문시 라우터
router.post("/order", adminRouter.companyOrder)

module.exports = router;