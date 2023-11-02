const express = require('express');
const router = express.Router();

const loginController = require('../controller/cLogin');
router.get("/", loginController.cLogin)

module.exports = router;