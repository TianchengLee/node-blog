module.exports = {
  handleArticleAddGet(req, res) {
    res.render('article.ejs', {
      user: req.session.user,
      isLogin: req.session.isLogin
    })
  }
}