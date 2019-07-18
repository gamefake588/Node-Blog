// 引入框架
const express = require("express")
const Api = express.Router()

// 数据库
const conn = require("./mysql/sql")

// 文件上传需要
const fs = require('fs')
const multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块 
const multipartMiddleware = multipart();

// 数据解析 POST请求需要
const bodyParser = require('body-parser')
Api.use(bodyParser.urlencoded({ extended: false, limit: 5 * 1024, parameterLimit: 1000 }))
// Api.use(multipart({ uploadDir: './public/images/User/bin/' }));//设置上传文件存放的地址。

// 邮件发送
const nodemailer = require("nodemailer");
// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",    // 发送方邮箱归属地
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '2592084620@qq.com', // 发送方邮箱
        pass: 'qvhsgamfvpcaeaai' // 发送需要的验证码
    }
});

// cookie
const cookieParser = require('cookie-parser')
Api.use(cookieParser())
// 加密功能
const crypto = require('crypto')

// 时间
const sd = require('silly-datetime')

// 加密
const encryption = (data) => {
    const cipher = crypto.createCipher('aes192', "123321");
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted
}
// 解密
const Decrypt = (data) => {
    const decipher = crypto.createDecipher('aes192', '123321')
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted
}

// 登陆时间 - 方法
const LoginTime = (id) => {
    const time = sd.format(new Date(), "YYYY-MM-DD H:m:s")
    // 修改数据库
    const update = `update user_center set user_time='${time}' where user_id='${id}' `
    conn.query(update, (err, msg) => {
        if (err) {
            res.end(JSON.stringify({ return_code: '500', return_str: '错误:)', return_err: err }))
            return
        }
    })
}

// 自动登陆
Api.post("/Api/automatic_login", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    let automatic_data = { "email": req.body.id }
    let sql = `select ID,username,email,head_portrait from login_register where email='${automatic_data.email}' `
    conn.query(sql, (err, rows) => {
        if (err) throw err

        switch (true) {
            // 判断数据库是否有此用户
            case rows[0] !== '[]' && rows[0] !== undefined:
                // 合并对象
                Object.assign(rows[0], {
                    return_code: "200",
                    return_str: "登陆成功",
                })
                // 修改登陆时间
                LoginTime(rows[0].ID)
                // 提供数据
                res.write(JSON.stringify(rows[0]))
                break;
            default:
                res.write(JSON.stringify(
                    {
                        return_code: "500",
                        return_str: "用户名或密码不正确",
                    }
                ))

        }

        res.end()
    })

})

// 账号密码登陆
Api.post("/Api/login", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    let login_data = {
        // 用户账号密码
        "login_name": req.body.login_name,
        "login_pass": req.body.login_pass,
    }

    let sql = `select username,email,head_portrait,password,ID from login_register where email='${login_data.login_name}' and password='${login_data.login_pass}' `;
    conn.query(sql, function (err, rows) {
        if (err) throw err

        switch (true) {
            // 判断数据库是否有此用户
            case rows[0] !== '[]' && rows[0] !== undefined:
                // 判断用户名和密码是否对应
                if (rows[0].email == login_data.login_name && rows[0].password == login_data.login_pass) {
                    // 合并对象
                    Object.assign(rows[0], {
                        return_code: "200",
                        return_str: "登陆成功",
                    })
                    // 修改登陆时间
                    LoginTime(rows[0].ID)
                    res.write(JSON.stringify(rows[0]))
                }
                else {
                    res.write(JSON.stringify(
                        {
                            return_code: "500",
                            return_str: "用户名或密码不正确",
                        }
                    ))
                }

                break;
            default:
                res.write(JSON.stringify(
                    {
                        return_code: "500",
                        return_str: "用户名或密码不正确",
                    }
                ))
        }

        res.end();

    });

    // console.log(login_data)

})

// 用户邮箱登陆
Api.post("/Api/email_login", (req, res) => {

    // 接收数据
    let data = {
        email: req.body.email,
        code: req.body.code,
    }
    // 加密获取
    let encryption_email = "HUGX_" + encryption(`${data.email}`)
    let encryption_code = encryption(`${data.code}`)

    // 获取cookie
    let emailCookie = req.cookies
    // 判断验证码是否正确
    if (emailCookie[encryption_email] === encryption_code) {
        const sql = `select ID,email,head_portrait from login_register where email='${data.email}' `
        conn.query(sql, (err, rows) => {
            // 是否存在用户
            if (rows.length !== 0) {
                // 合并对象
                Object.assign(rows[0], {
                    return_code: "200",
                    return_str: "登陆成功",
                })
                // 修改登陆时间
                LoginTime(rows[0].ID)
                res.write(JSON.stringify(rows[0]))
                res.end()
            }
            else {
                res.write(JSON.stringify({
                    return_code: "500",
                    return_str: "没有此用户，请先去注册!",
                }))
                res.end()
            }
        })
    }
    else {
        res.write(JSON.stringify({ return_code: "500", return_str: "验证码不正确", }))
        res.end()
    }

})

// 用户注册
Api.post("/Api/register", multipartMiddleware, (req, res) => {

    let data = {
        head_portrait: req.files.head_portrait.path,
        phone: req.body.phone,
        email: req.body.email,
        code: req.body.code,
        pass: req.body.pass,
    }

    // 随机用户名
    const arr = ['Allen.Ray', 'Duncan.Tim', 'Howard.Dwight', 'Dwyane.wade', 'Iverson.Allen', 'James.LeBron', 'Paul.Chris', 'Giannis.Antetokounmpo', 'James.Harden']
    const name = arr[Math.floor(Math.random(arr) * 9)]

    // 获取IP
    const requestIp = require('request-ip');
    const IP = requestIp.getClientIp(req)

    // 获取当前时间 - (注册时间)
    const time = sd.format(new Date(), 'YYYY-MM-DD')

    // 加密获取 - 邮箱和验证码
    let encryption_email = "Register_" + encryption(`${data.email}`)
    let encryption_code = encryption(`${data.code}`)

    // 获取cookie
    let emailCookie = req.cookies
    // 验证
    switch (emailCookie[encryption_email]) {
        // 判断验证码是否正确
        case encryption_code:
            // 验证注册邮箱是否存在
            const select = `select email from login_register where email='${data.email}' `
            conn.query(select, (err, msg) => {
                // 存在 - 返回数据
                if (msg) {
                    // 删除验证码Cookie
                    res.cookie(encryption_email, '', { expires: new Date(0) });
                    res.write(JSON.stringify({ return_code: "500", return_str: "已有此用户，您可以去登陆" }))
                    res.end()
                    return
                }
                // 将文件保存至/public/images/User/img/
                fs.readFile(data.head_portrait, (err, msg) => {
                    if (err) throw err
                    // 删除验证码Cookie
                    res.cookie(encryption_email, '', { expires: new Date(0) });
                    // 写入路径 - 加密文件名
                    const data_file = "./public/images/User/img/" + encryption(`${name}`) + req.files.head_portrait.name
                    // 存入数据库路径
                    const db_path = `http://` + req.headers.host + `/public/images/User/img/` + encryption(`${name}`) + req.files.head_portrait.name
                    // 写入文件
                    fs.writeFile(data_file, msg, (err) => { if (err) throw err })
                    // 用户ID
                    const randomString = require('random-string');
                    // 创建子评论的key
                    const user_id = randomString({
                        length: 13,
                        numeric: true,
                        letters: true,
                        special: false,
                    });
                    // sql语句
                    const sql = `insert into login_register 
                    values('user-${user_id}','${name}','${data.pass}','${data.phone}','${data.email}','${db_path}','${IP}','${time}','本地',0,0)`
                    // 保存到数据库
                    conn.query(sql, (err, rows) => {
                        if (err) throw err
                        res.write(JSON.stringify({ return_code: "200", return_str: "注册成功" }))
                        res.end()
                        console.log(`用户：${data.email}注册成功`)
                    })
                })
            })
            break;
        // 验证码获取不到时为空
        case undefined:
            res.write(JSON.stringify({ return_code: "500", return_str: "验证码失效，请重新发送新的验证码" }))
            res.end()
            break;
        default:
            res.write(JSON.stringify({ return_code: "500", return_str: "验证码不正确" }))
            res.end()
    }

    // 删除备份文件 - （优化）
    fs.unlink(data.head_portrait, (err) => {
        if (err) throw err
        console.log("用户图像备份文件删除成功")
    })

})

// 修改密码
Api.post("/Api/updata_pass", (req, res) => {

    const data = {
        email: req.body.email,
        code: req.body.code,
        pass: req.body.pass,
    }

    // 加密获取 - 邮箱和验证码
    const encryption_email = "ForgetPass_" + encryption(`${data.email}`)
    const encryption_code = encryption(`${data.code}`)

    // 获取cookie
    let emailCookie = req.cookies
    // 验证
    switch (emailCookie[encryption_email]) {
        // 判断验证码是否正确
        case encryption_code:
            const update = `update login_register set password='${data.pass}' where email='${data.email}' `
            conn.query(update, (err) => {
                if (err) throw err
                res.write(JSON.stringify({
                    return_code: '200',
                    return_str: '修改密码成功',
                }))
                res.end()
                console.log(`用户：${data.email}修改密码成功`)
            })
            break;
        // 获取不到验证码
        case undefined:
            res.write(JSON.stringify({ return_code: "500", return_str: "验证码失效，请重新发送新的验证码" }))
            res.end()
            break;
        default:
            res.write(JSON.stringify({ return_code: "500", return_str: "验证码不正确" }))
            res.end()


    }

})

// 邮箱验证码
Api.post("/Api/email_code", (req, res) => {

    // 收件人邮箱
    let email = req.body.email
    // 类型
    let type = req.body.type
    // 生成随机验证码
    let code = parseInt(Math.random(11111, 99999) * 100000)
    // 发送邮件的信息
    let mailobj = {}
    // 发送邮件方法 ${dense} - 加密密文头
    const Set_sendMail = (dense) => {
        // 发送邮件
        transporter.sendMail(mailobj, (err, data) => {
            if (err) {
                res.end(JSON.stringify({ return_code: "500", return_str: "邮件发送失败" }))
                return
            }
            // 发送邮件成功后操作
            // 每个加密字符串使用一次 - 每次加密的时候都创建一个新的md5加密块
            let md5_email = dense + encryption(`${email}`)
            let md5_code = encryption(`${code}`)

            // 设置双重cookie
            res.cookie(md5_email, md5_code, { maxAge: 300 * 1000, httpOnly: true })
            // 返回数据
            res.write(JSON.stringify({
                return_code: "200",
                return_str: "邮件发送成功",
                email: md5_email,
                code: md5_code,
            }))
            res.end()
        })
    }
    // 验证是否存在邮箱用户 - 
    const Set_verification = (email, type) => {
        const select = `select email from login_register where email='${email}' `
        conn.query(select, (err, msg) => {
            switch (type) {
                // 注册
                case "Register_":
                    // 存在 - 返回数据
                    if (msg.length !== 0) {
                        res.write(JSON.stringify({ return_code: "500", return_str: "已有此用户，您可以去登陆" }))
                        res.end()
                        return
                    }
                    Set_sendMail('Register_')
                    console.log(`${email}注册邮件发送成功`)
                    break;
                // 修改密码
                case "ForgetPass_":
                    // 不存在
                    if (msg.length === 0) {
                        res.write(JSON.stringify({ return_code: "500", return_str: "没有此用户，请先去注册!" }))
                        res.end()
                        return
                    }
                    Set_sendMail('ForgetPass_')
                    console.log(`${email}忘记密码邮件发送成功`)
                    break;
            }
        })
    }
    // 重复调用改接口
    switch (type) {
        case '登陆':
            mailobj = {
                from: '"HUANGXIAN HuGx 👻👻👻" <2592084620@qq.com>', // 发件人
                to: email, // 接收人邮箱
                subject: `Hello ${email} 欢迎登陆 HuGx个人博客 - 登陆`, // 标题
                html: `验证码 ：${code} <br> 请在五分钟内使用` // html body
            }
            // 发送邮件
            Set_sendMail('HUGX_')
            console.log(`${email}登陆邮件发送成功`)
            break;
        case '注册':
            mailobj = {
                from: '"HUANGXIAN HuGx 👻👻👻" <2592084620@qq.com>', // 发件人
                to: email, // 接收人邮箱
                subject: `Hello ${email} 欢迎注册 HuGx个人博客 - 注册`, // 标题
                html: `验证码 ：${code} <br> 请在五分钟内使用` // html body
            }
            // 验证是否存在用户
            Set_verification(email, "Register_")
            break;
        case '忘记密码':
            mailobj = {
                from: '"HUANGXIAN HuGx 👻👻👻" <2592084620@qq.com>', // 发件人
                to: email, // 接收人邮箱
                subject: `Hello ${email} 很抱歉您忘记密码 HuGx个人博客 - 忘记密码`, // 标题
                html: `验证码 ：${code} <br> 请在五分钟内使用` // html body
            }
            // 发送邮件
            // 验证是否存在用户
            Set_verification(email, "ForgetPass_")
            break;
        default:
            res.end(JSON.stringify({ return_code: "500", return_str: "邮件发送失败" }))
            return
    }


})


module.exports = Api