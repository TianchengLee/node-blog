const conn = require('../db/db.js')

module.exports = {
  handleIndexGet(req, res) {
    // 如果登录成功了  req.session中就会有 user属性
    // 默认情况下  session的过期时间就是关闭浏览器时

    // 定义每页显示的文章数量
    let pageSize = 5

    let currentPage = parseInt(req.query.page) || 1

    // limit的第一个值 = (currentPage - 1) * pageSize
    // page : 1    limit : 0
    // page : 2    limit : 3
    // page : 3    limit : 6

    const querySql = `select a.id, a.title, a.ctime, u.nickname, u.username from articles as a
    left join users as u
    on a.author_id = u.id
    order by a.id desc
    limit ${(currentPage - 1) * pageSize}, ${pageSize};
    select count(*) as count from articles;`

    conn.query(querySql, (err, result) => {
      // console.log(result)
      // 判断是否出错, 如果出错了 result是undefined  所以就直接赋值为空数组避免模板引擎出错
      if (!result) result = [[]] // 如果result查询到结果了  就不会进入if 不会覆盖结果
      // 总文章数量
      let totalCount = result[1][0].count

      // 根据总文章数量和每页显示的条数  计算出总的页数
      let totalPage = Math.ceil(totalCount / pageSize)
      console.log(currentPage)
      res.render('./index.ejs', {
        user: req.session.user,
        isLogin: req.session.isLogin,
        articles: result[0],
        totalPage: totalPage,
        currentPage: currentPage
      })
    })

  }
}