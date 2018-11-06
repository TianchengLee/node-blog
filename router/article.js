const express = require('express')
const controller = require('../controller/article.js')
const router = express.Router()

router.get('/article/add', controller.handleArticleAddGet);

router.post('/article/add', controller.handleArticleAddPost);

router.get('/article/info/:id', controller.handleArticleInfoGet);

module.exports = router