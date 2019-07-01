
// 数据库连接
const mysql = require("mysql")

// 创建连接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "hugx_blog",
    charset: 'UTF8', //数据库编码
    timezone:"08:00",   // 配置数据库时间格式
})

//创建一个conn连接
connection.connect(function (err) {
    if (err) throw err
    console.log("数据库连接成功")
});

module.exports = connection