
// 引入框架
const express = require("express")
const app = express()
const port = 3000

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //带cookies7
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200);  //让options尝试请求快速结束
  else
    next();
})

// 接口
const login = require("./Api/login")
const article = require("./Api/article")
const leaving = require("./Api/leaving")
const UserCenter = require("./Api/UserCenter")
app.use(login)
app.use(article)
app.use(leaving)
app.use(UserCenter)


// 默认
app.get("/", (req, res) => {
  res.send("demo")
  res.end();
})

// 读取图片
app.get('/public/images/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
  console.log("获取图片：" + req.url);
})

app.listen(port, (err) => {
  if (err) throw err
  console.log("启动服务器成功")
})