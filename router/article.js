const express = require('express')
const controller = require('../controller/article.js')
const router = express.Router()

router.get('/article/add', controller.handleArticleAddGet);

module.exports = router