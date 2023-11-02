const express = require('express');
const router = express.Router();

const menuController = require('../controller/cMenu');
router.get("/", menuController.cMenu);

module.exports = router;