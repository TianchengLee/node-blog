const express = require('express')
const app = express()

// 设置默认的模板引擎
app.set('view engine', 'ejs')
// 模板的根目录  将来渲染页面时都相对此路径
app.set('views', './views')

app.use('/node_modules', express.static('./node_modules'))

app.get('/', (req, res) => {
  res.render('./index.ejs', {})
});

app.listen(80, () => {
  console.log('http://127.0.0.1');
})
