module.exports = {
  handleIndexGet(req, res) {
    // 如果登录成功了  req.session中就会有 user属性
    // 默认情况下  session的过期时间就是关闭浏览器时
    console.log(req.session)
    res.render('./index.ejs', {
      user: req.session.user,
      isLogin: req.session.isLogin
    })
  }
}