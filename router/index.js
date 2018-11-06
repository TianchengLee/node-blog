const express = require('express')
const router = express.Router()
const controller = require('../controller/index.js')
router.get('/', controller.handleIndexGet);

module.exports = router