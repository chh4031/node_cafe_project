const express = require('express');
const router = express.Router();

const registerController = require('../controller/cRegister');
router.get("/", registerController.cRegister);

router.post("/", registerController.registerTodb)

module.exports = router;