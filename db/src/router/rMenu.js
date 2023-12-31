const express = require('express');
const router = express.Router();

const menuController = require('../controller/cMenu');
router.get("/", menuController.cMenu);

router.post("/orderOK", menuController.cOrderOK)

router.post("/order", menuController.cOrder);

router.post("/orderDelete", menuController.cDelete);

router.get("/confirm", menuController.cConfrim);

router.post("/select", menuController.cSelect);

router.post("/search", menuController.cSearch);

module.exports = router;