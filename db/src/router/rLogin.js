const express = require('express');
const router = express.Router();

const loginController = require('../controller/cLogin');
router.get("/", loginController.cLogin)

router.post("/", loginController.loginCheckTodb)

router.get("/logout", loginController.cLogout)

module.exports = router;