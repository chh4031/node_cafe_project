const express = require('express');
const router = express.Router();

const menuRouter = require('../controller/menuController');

router.get("/", menuRouter.menuView);

module.exports = router;