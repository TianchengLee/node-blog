module.exports = {
  handleArticleAddGet(req, res) {
    // 判断用户的登录状态 处理登录拦截
    if (!req.session.isLogin) return res.redirect('/')
    res.render('./articles/add.ejs', {
      user: req.session.user,
      isLogin: req.session.isLogin
    })
  }
}