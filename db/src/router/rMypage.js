const express = require('express');
const router = express.Router();

const mypageController = require('../controller/cMypage');

router.get("/", mypageController.cMypage)

module.exports = router;