const moment = require('moment')
const conn = require('../db/db.js')
const marked = require('marked')

module.exports = {
  handleArticleAddGet(req, res) {
    // 判断用户的登录状态 处理登录拦截
    if (!req.session.isLogin) return res.redirect('/')
    res.render('./articles/add.ejs', {
      user: req.session.user,
      isLogin: req.session.isLogin
    })
  },
  handleArticleAddPost(req, res) {
    if (!req.session.isLogin) return res.status(400).send({ status: 400, msg: '您的登录信息已失效, 请保存文章后重新登录' });
    const body = req.body
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    body.author_id = req.session.user.id
    const insertSql = 'insert into articles set ?'
    conn.query(insertSql, body, (err, result) => {
      if (err) return res.status(500).send({ status: 500, msg: '文章发表失败,请重试!' })
      res.send({ status: 200, msg: 'ok', articleId: result.insertId });
    })
  },
  handleArticleInfoGet(req, res) {
    // req.query用于获取 ? 传递过来的参数
    // console.log(req.params) // req.params 用于获取 :id传递过来的参数
    const id = req.params.id
    const querySql = 'select * from articles where id = ' + id
    conn.query(querySql, (err, result) => {
      // 封装渲染的对象, 登录用户信息和是否登录的记录
      const renderObj = {
        user: req.session.user,  // 如果用户未登录 user 则不存在
        isLogin: req.session.isLogin
      }
      // 如果出现错误或者查不到文章 就返回404页面
      if (err || result.length !== 1) return res.render('./404.ejs', renderObj)
      // 如果找到文章就将文章转换为HTML标签
      result[0].content = marked(result[0].content)
      // 将文章对象加到renderObj中
      renderObj.article = result[0]
      // 渲染文章详情页面
      res.render('./articles/info.ejs', renderObj)

      // console.log(renderObj.article)

    })
  },
  handleArticleEditGet(req, res) {
    if (!req.session.isLogin) return res.redirect('/')
    // 查询数据库 根据ID获取文章信息
    const id = req.params.id
    const querySql = 'select * from articles where id = ' + id
    conn.query(querySql, (err, result) => {
      if (err || result.length !== 1) return res.status(500).send({ status: 500, msg: '文章获取失败, 请重试', data: null })
      console.log(result)
      res.render('./articles/edit.ejs', {
        user: req.session.user,
        isLogin: req.session.isLogin,
        article: result[0]
      })
    })

  },
  handleArticleEditPost(req, res) {
    const article = req.body
    article.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(article)
    const updateSql = 'update articles set ? where id = ?'
    conn.query(updateSql, [article, article.id], (err, result) => {
      if (err || result.affectedRows !== 1) return res.status(400).send({ status: 400, msg: '修改文章失败, 请重试!', data: null })
      // 修改成功, 像客户端响应结果
      res.send({status: 200, articleId: article.id});
    })
  }
}