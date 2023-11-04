const express = require('express');
const router = express.Router();

const mainController = require('../controller/cMain');

router.get("/", mainController.cMain);



module.exports = router;