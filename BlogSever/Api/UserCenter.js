
// 用户中心  - Api
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

// 加密功能
const crypto = require('crypto')

// 加密
const encryption = (data) => {
    const cipher = crypto.createCipher('aes192', "123321");
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted
}


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

// 获取用户个人信息
Api.post('/basic_user', (req, res) => {

    // 用户ID
    const Uid = req.body.user_id
    // 验证是否为空
    if (Uid === '' || Uid === null) {
        res.end(JSON.stringify({ return_code: '500', return_str: '用户不存在' }))
        return
    }
    // 多表查询（用户表） - （用户个人信息表）
    const select = `select 
     login_register.head_portrait,login_register.username,login_register.register_time,login_register.ID,
     user_center.user_personal_description,user_center.user_time,user_center.user_website
     from login_register,user_center where login_register.ID='${Uid}' and user_center.user_id='${Uid}' `
    conn.query(select, (err, user_data) => {
        // 数据库错误
        if (err) {
            res.end(JSON.stringify({ return_code: '500', return_str: 'Null', return_err: err }))
            return
        }
        // 返回数据
        res.end(JSON.stringify({ return_code: '200', return_obj: user_data[0] }))

    })

})

// 获取用户交互信息
Api.post(`/user_interactive`, (req, res) => {

    // 用户ID
    const data = {
        Uid: req.body.user_id,
        type: req.body.type,
    }
    // 验证是否为空
    switch (true) {
        case data.Uid === '' || data.Uid === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '用户不存在' }))
            break;
        case data.type === '' || data.type === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '不知道搜索什么' }))
            break;
        default:
            // 判断查询哪个表
            let type = ''
            switch (data.type) {
                case '文章':
                    type = 'article'
                    break;
                case '点赞':
                    type = 'article_thumbs'
                    break;
                case '评论':
                    type = 'article_comm'
                    break;
            }
            // 查询交互信息
            const select = `select * from ${type} where article_userid='${data.Uid}' `
            conn.query(select, (err, list) => {
                if (err) {
                    res.end(JSON.stringify({ return_code: '500', return_str: '无', return_err: err }))
                    return
                }
                // 根据用户ID查询用户信息
                const select_user = `select ID,username,head_portrait from login_register where ID='${data.Uid}' `
                conn.query(select_user, (err, user_data) => {
                    // 合并数据
                    list.map(item => {
                        user_data.map(UserItem => {
                            if (item.article_userid === UserItem.ID) Object.assign(item, UserItem)
                        })
                        return item
                    })
                    // 查询成功返回数据
                    res.end(JSON.stringify({ return_code: '200', return_list: list }))
                })
            })
        // 查询交互信息 - end
    }

})

// 个人设置 - 头像上传
Api.post(`/Settings_img`, multipartMiddleware, (req, res) => {

    // 获取文件
    const data = {
        Uid: req.body.Uid,
        head_portrait: req.files.head_portrait.path,
    }
    // 验证是否为空
    switch (true) {
        case data.Uid === '' || data.Uid === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '用户不存在' }))
            break;
        case data.head_portrait === '' || data.head_portrait === undefined:
            res.end(JSON.stringify({ return_code: '500', return_str: '请选择图片' }))
            break;
        default:
            // 从数据库查询用户头像读取并修改
            const select = `select head_portrait from login_register where ID='${data.Uid}' `
            conn.query(select, (err, port) => {
                // 分割获取文件名
                let arr = []
                arr = port[0].head_portrait.split('img/')
                // 删除源文件 - （优化）
                fs.unlink(`./public/images/User/img/${arr[1]}`, (err) => {
                    if (err) throw err
                    console.log("用户图像源文件删除成功")
                })
                // 删除源文件 - （优化） - end
                // 读取用户头像
                fs.readFile(data.head_portrait, (err, msg) => {
                    if (err) throw err
                    // 获取当前时间 - (注册时间)
                    const sd = require('silly-datetime')
                    const time = sd.format(new Date(), 'YYYY-MM-DD')
                    // 写入路径 - 加密文件名
                    const data_file = "./public/images/User/img/" + encryption(`${time}`) + req.files.head_portrait.name
                    // 存入数据库路径
                    const db_path = `http://` + req.headers.host + `/public/images/User/img/` + encryption(`${time}`) + req.files.head_portrait.name
                    // 写入文件
                    fs.writeFile(data_file, msg, (err) => { if (err) throw err })
                    // 修改数据库
                    const update = `update login_register l,article_commreply c 
                    set l.head_portrait='${db_path}' , c.user_img='${db_path}' where l.ID='${data.Uid}' and c.user_id='${data.Uid}' `
                    conn.query(update, (err, row) => {
                        if (err) {
                            res.end(JSON.stringify({ return_code: '500', return_str: '无', return_err: err }))
                            return
                        }
                        // 修改成功
                        res.end(JSON.stringify({ return_code: '200', return_str: '修改头像成功' }))
                        // 删除备份文件 - （优化）
                        fs.unlink(data.head_portrait, (err) => {
                            if (err) throw err
                            console.log("用户图像备份文件删除成功")
                        })
                    })
                    // 修改数据库 - end
                })
                // 读取用户头像 - end
            })
    }

})

// 个人资料修改
Api.post(`/update_PersonalData`, (req, res) => {

    // 自定义用户网站
    let website = req.body.website === '' || req.body.website === null ? `http://localhost:8080/User_space?user_id=${req.body.Uid}` : req.body.website
    // 接收参数
    const data = {
        Uid: req.body.Uid,
        name: req.body.name,
        website: website,
        Personal_Description: req.body.Personal_Description,
    }

    // 验证
    switch (true) {
        case data.Uid === '' || data.Uid === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '获取不到用户' }))
            break;
        case data.name === '' || data.name === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '请输入用户名' }))
            break;
        case data.Personal_Description === '' || data.Personal_Description === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '请描述一下自己吧:)' }))
            break;
        default:
            // 修改用户表数据
            const update_user = `update login_register set username='${data.name}' where ID='${data.Uid}' `
            conn.query(update_user, (err, msg) => {
                if (err) {
                    res.end(JSON.stringify({ return_code: '500', return_str: '错误:)', return_err: err }))
                    return
                }
                // 修改成功
                // res.end(JSON.stringify({ return_code: '200', return_str: '修改成功:)' }))
            })
            // 修改用户表数据 - end

            // 修改用户表数据
            const update_userdata = `update user_center 
            set user_name='${data.name}',user_personal_description='${data.Personal_Description}',user_website='${data.website}'
            where user_id='${data.Uid}' `
            conn.query(update_userdata, (err, msg) => {
                if (err) {
                    res.end(JSON.stringify({ return_code: '500', return_str: '错误:)', return_err: err }))
                    return
                }
                // 修改成功
                res.end(JSON.stringify({ return_code: '200', return_str: '修改成功:)' }))
            })
        // 修改用户表数据 - end
    }

})

// 修改个人密码
Api.post(`/AgaNewPassword`, (req, res) => {

    // 接收参数
    const data = {
        Uid: req.body.Uid,
        pass: req.body.pass,
        NewPassword: req.body.NewPassword,
        AgaNewPassword: req.body.AgaNewPassword,
    }

    // 判断
    switch (true) {
        case data.Uid === '' || data.Uid === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '获取不到用户:)' }))
            break;
        case data.pass === '' || data.pass === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '请输入旧密码:)' }))
            break;
        case data.NewPassword === '' || data.NewPassword === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '请输入新密码:)' }))
            break;
        case data.AgaNewPassword === '' || data.AgaNewPassword === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '再次输入新密码:)' }))
            break;
        default:
            // 获取用户
            const select_user = `select ID,password from login_register where ID='${data.Uid}' `
            conn.query(select_user, (err, msg) => {
                // 判断是否存在此用户
                if (msg[0].length === 0) {
                    res.end(JSON.stringify({ return_code: '500', return_str: '用户不存在:)' }))
                    return
                }
                // 判断旧密码是否正确
                if (data.pass !== msg[0].password) {
                    res.end(JSON.stringify({ return_code: '500', return_str: '密码不正确:)' }))
                    return
                }
                console.log(msg)
                // 用户存在则修改密码
                const update_pass = `update login_register set password='${data.AgaNewPassword}' where ID='${msg[0].ID}' `
                conn.query(update_pass, (err, up) => {
                    if (err) {
                        res.end(JSON.stringify({ return_code: '500', return_str: '错误:)', return_err: err }))
                        return
                    }
                    // 修改成功
                    res.end(JSON.stringify({ return_code: '200', return_str: '修改成功:)' }))
                })
                // 修改密码 - end
            })
        // 获取用户 - end
    }

})






module.exports = Api