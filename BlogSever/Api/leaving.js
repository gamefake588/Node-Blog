/**
 * 
 * 留言API
 * 
 */

const express = require('express')
const Api = express.Router()

// 数据库
const conn = require("./mysql/sql")

// 数据解析 POST请求需要
const bodyParser = require('body-parser')
Api.use(bodyParser.urlencoded({ extended: false, limit: 5 * 1024, parameterLimit: 1000 }))

// 获取时间
const sd = require('silly-datetime')
// 随机数
const randomString = require('random-string');


// 获取留言数据
Api.post('/leaving_data', (req, res) => {
    // 获取数据
    const select = `select * from leaving`
    conn.query(select, (err, proves) => {
        if (err) {
            res.end(JSON.stringify({
                return_code: '500',
                return_str: '无',
                return_err: err,
            }))
            return
        }
        // 创建存放点接收返回出来的对象
        const replyDist = []
        // 获取回复留言数据 - 方法
        const Get_reply = id => new Promise((resolve, reject) => {
            const select_reply = `select * from article_commreply where reply_type='留言' and pid='${id}' `
            conn.query(select_reply, (err, reply) => {
                if (err) {
                    res.end(JSON.stringify({
                        return_code: '500',
                        return_str: '无',
                        return_err: err,
                    }))
                    return
                }
                // 判断是否有数据
                if (reply.length !== 0) {
                    // 遍历列表
                    reply.filter((item, index) => {
                        // 插入数组
                        replyDist.push(item)
                    })
                    // 返回数组
                    return resolve(replyDist)
                }
            })
        })
        // filter方法遍历留言字典
        proves.filter(value => {
            // 调用方法
            Get_reply(value.message_id)
                .then(msg => {
                    // 有回复留言在此返回数据
                    // 异步获取最后一位数据并将数据返回给前端
                    setTimeout(() => {
                        res.end(JSON.stringify({
                            leaving: proves,
                            reply: msg,
                        }))
                    }, 10)
                })
        })
        // 遍历留言字典 - 结束
        // 无回复留言在此返回数据
        // 将数据返回给前端
        setTimeout(() => {
            res.end(JSON.stringify({
                leaving: proves,
                reply: replyDist,
            }))
        }, 10)
    })

})

// 留言
Api.post('/leaving', (req, res) => {
    // 接收数据
    const data = {
        Uid: req.body.user_id,
        content: req.body.content,
    }
    // 验证
    switch (true) {
        case data.Uid === "" || data.Uid === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '请先登陆在留言' }))
            break;
        case data.content === "" || data.content === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '内容不能为空' }))
            break;
        default:
            // 根据用户ID获取用户信息
            const select_user = `select ID,username,head_portrait from login_register where ID='${data.Uid}' `
            conn.query(select_user, (err, user_data) => {
                // 判断是否存在此用户
                if (user_data.length !== 0) {
                    // 获取IP
                    const requestIp = require('request-ip')
                    const IP = requestIp.getClientIp(req)
                    // 获取时间
                    const time = sd.format(new Date(), 'YYYY-MM-DD h:m:s')
                    // 随机留言ID
                    const leaving_id = randomString({
                        length: 13,
                        numeric: true,
                        letters: true,
                        special: false,
                    })
                    // 更新留言表
                    const insert = `insert into leaving values
                    ('message-${leaving_id}',${user_data[0].ID},'${data.content}','${user_data[0].head_portrait}','${time}','${user_data[0].username}','${IP}') `
                    conn.query(insert, (err, insert_leaving) => {
                        if (err) {
                            res.end(JSON.stringify({
                                return_code: '500',
                                return_str: '无',
                                return_err: err,
                            }))
                            return
                        }
                        // 留言成功
                        res.end(JSON.stringify({ return_code: '200', return_str: '留言成功', }))
                    })
                    // 更新留言表 - 结束
                }
            })
        // 根据用户ID获取用户信息 - 结束
    }

})

// 回复留言
Api.post('/Reply_leaving', (req, res) => {
    // 数据存放点
    const data = {
        Uid: req.body.user_id,
        content: req.body.content,
        pid: req.body.pid,
        by_reply_id: req.body.by_reply_id,
    }
    // 非空验证
    switch (true) {
        case data.Uid === '' || data.Uid === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '请登录后在留言' }))
            break;
        case data.content === '' || data.content === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '回复内容不能为空' }))
            break;
        case data.pid === '' || data.pid === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '找不到回复用户' }))
            break;
        case data.by_reply_id === '' || data.by_reply_id === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '找不到回复用户' }))
            break;
        default:
            // 获取评论用户和被回复用户的信息
            const Get_end = (uid) => new Promise((resolve, reject) => {
                // 根据用户ID获取用户信息
                const select_user = `select ID,username,head_portrait from login_register where ID='${uid}' `
                conn.query(select_user, (err, prove) => {
                    // 判断是否存在该用户
                    if (prove.length === 0) {
                        res.end(JSON.stringify({
                            return_code: '500',
                            return_str: '无用户回复',
                        }))
                        return
                    }
                    // 将用户信息返回
                    return resolve(prove)
                })
            })
            // 第一次调用函数获取评论用户的信息
            Get_end(data.Uid)
                .then(msg => {
                    // 获取评论时间
                    const time = sd.format(new Date(), "YYYY-MM-DD H:m:s")
                    // 创建子评论的key
                    const key = randomString({
                        length: 13,
                        numeric: true,
                        letters: true,
                        special: false,
                    });
                    // 第二次调用函数获取被回复用户的信息
                    Get_end(data.by_reply_id)
                        .then(prove => {
                            // 更新文章子评论表信息
                            const insert = `insert into article_commreply values
                            ('reply-${key}','${msg[0].ID}','${msg[0].username}','${msg[0].head_portrait}','${data.content}','${time}','留言','${data.by_reply_id}','${prove[0].username}','${data.pid}')`
                            conn.query(insert, (err, proveI) => {
                                if (err) {
                                    res.end(JSON.stringify({
                                        return_code: '500',
                                        return_str: '错误',
                                        return_err: err,
                                    }))
                                    return
                                }
                                // 回复成功
                                res.end(JSON.stringify({ return_code: '200', return_str: '回复成功', }))
                            })
                            // 更新文章子评论表信息 - 结束
                        })
                })
    }

})



module.exports = Api