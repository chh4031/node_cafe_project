const express = require('express');
const router = express.Router();

const detailController = require('../controller/cDetail');

router.get("/", detailController.cDetail);

router.post("/orderDetail", detailController.cOrderDetail)

module.exports = router;