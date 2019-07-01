
// 文章  - Api
const express = require("express")
const app = express()
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
//设置上传文件存放的地址。
// Api.use(multipart({ uploadDir: './public/images/Article/bin/' }));
// 加密功能
const crypto = require('crypto')
// 获取时间
const sd = require('silly-datetime')
// 随机数
const randomString = require('random-string');

// 加密
const encryption = (data) => {
    const cipher = crypto.createCipher('aes192', "123321");
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted
}


// 用户发布文章
Api.post("/article", (req, res) => {

    // 随机文章ID
    const article_id = randomString({
        length: 13,
        numeric: true,
        letters: true,
        special: false,
    });
    // 获取发布时间
    const time = sd.format(new Date(), 'YYYY-MM-DD')
    const date = sd.format(new Date(), 'YYYY-MM-DD H:m:s')
    // 获取数据
    const data = {
        article_id: `article_${article_id}`,
        email: req.body.email,
        label: req.body.label,
        title: req.body.title,
        content: req.body.content,
        time: time,
        date: date,
    }
    // 根据邮箱获取用户信息
    const select = `select ID,username from login_register where email='${data.email}' `
    conn.query(select, (err, rows) => {
        if (err) throw err
        // 获取不到此用户时！
        if (rows.length === 0) {
            res.write(JSON.stringify({
                return_code: '500',
                return_str: `获取不到此用户`,
                return_errCode: `404`,
            }))
            res.end();
            return
        }
        // 将文章信息插入数据库
        const insert = `insert into article 
        values('${data.article_id}','${rows[0].ID}','${rows[0].username}','${data.title}','${data.content}','${data.time}','${data.date}',0,0,0,'${data.label}','用户') `
        conn.query(insert, (err, msg) => {
            // 发布失败返回
            if (err) {
                res.write(JSON.stringify({
                    return_code: '500',
                    return_str: `发布失败`,
                    return_err: `错误：${err}`,
                }))
                res.end();
                return
            }
            // 发布成功执行
            res.write(JSON.stringify({
                return_code: '200',
                return_str: "发布成功",
            }))
            res.end();
        })
    })

})

// 用户发布文章 - 图片接口 
Api.post("/uploadImg", multipartMiddleware, (req, res) => {

    const FilePath = req.files.ArticleImg.path
    // 获取文件
    fs.readFile(FilePath, (err, msg) => {
        if (err) throw err
        const FileName = req.files.ArticleImg.name
        // 获取当前时间 
        const time = sd.format(new Date(), 'YYYY-MM-DD')
        // 以当前日期创建文件夹
        fs.mkdir(`./public/images/Article/${time}`, (err) => {
            // 写入路径 - 加密文件名
            const data_file = `./public/images/Article/${time}/` + encryption(`${sd.format(new Date())}`) + FileName
            // 返回网络路径
            const UrlFile = `http://` + req.headers.host + `/public/images/Article/${time}/` + encryption(`${sd.format(new Date())}`) + FileName;
            // 写入文件
            fs.writeFile(data_file, msg, (err) => {
                if (err) throw err
                const return_data = {
                    error: 0,
                    data: data_file,
                    url: UrlFile,
                }
                res.write(JSON.stringify(return_data))
                res.end();
            })
        })
    })

    // 删除备份文件 - （优化）
    fs.unlink(FilePath, (err) => {
        if (err) throw err
        console.log("用户发布图像备份文件删除成功")
    })

})

// 首页获取博主发布的文章
Api.post("/Get_articles", (req, res) => {
    // 页数
    const page = req.body.page
    // 每页获取六条数据
    let PageData = page * 6
    // 获取文章
    const sql = `select * from article where article_type='博主' limit 0,${PageData} `
    conn.query(sql, (err, msg) => {
        if (err) {
            res.write(JSON.stringify({
                return_code: "200",
                return_str: "数据库错误",
                return_err: err,
            }))
            res.end()
            return
        }
        res.write(JSON.stringify(msg))
        res.end()
    })


})

// 获取用户发布的文章
Api.post("/article_user", (req, res) => {
    // 页数
    const page = req.body.page
    // 每页获取六条数据
    let PageData = page * 8
    // 获取文章
    const sql = `select * from article where article_type='用户' limit 0,${PageData} `
    conn.query(sql, (err, msg) => {
        if (err) {
            res.write(JSON.stringify({
                return_code: "200",
                return_str: "数据库错误",
                return_err: err,
            }))
            res.end()
            return
        }
        res.write(JSON.stringify(msg))
        res.end()
    })


})

// 获取文章详情信息
Api.post("/article_details", (req, res) => {
    // 文章ID
    const Aid = req.body.Aid
    // 获取文章评论
    const select = `select * from article_comm where article_id='${Aid}' `
    conn.query(select, (err, msg) => {
        if (msg.length === 0) {
            res.write(JSON.stringify({
                return_code: '500',
                return_str: '无评论',
            }))
            res.end()
            return
        }
        /**
         * 
         * 利用map方法修改原字典
         * 将子评论的信息合并至其父级中
         */
        let Sonlist = []                        // 子回复存放点
        msg.map((item, index) => {
            // 根据文章ID查找改评论下的子评论
            const repltSelect = `select * from article_CommReply where pid='${item.article_comm_id}' `
            conn.query(repltSelect, (err, rows) => {
                if (err) {
                    res.write(JSON.stringify({
                        return_code: '500',
                        return_str: '错误',
                        return_err: err,
                    }))
                    res.end()
                    return
                }
                // 判断是否存在子评论
                if (rows.length !== 0) {
                    for (let j in rows) {
                        // 获取子评论
                        Sonlist.push(rows[j])
                        if (item.article_comm_id === rows[j].pid) Object.assign(item, rows[j])
                    }
                    // 返回数组
                    return Sonlist
                }
            })
        })
        // map方法结束
        // 异步获取最后一个字典
        setTimeout(() => {
            res.end(JSON.stringify({
                Onelist: msg,
                Sonlist: Sonlist,
            }))
        }, 100)
    })
})

// 文章点赞
Api.post("/Fabulous", (req, res) => {
    // 接收数据
    const data = {
        Aid: req.body.article_id,
        Uid: req.body.user_id,
    }
    // 获取当前时间 
    const time = sd.format(new Date(), 'YYYY-MM-DD H:m:s')

    // 业务逻辑
    // 先判断文章点赞表里是否有该数据
    const select = `select * from article_thumbs where article_id='${data.Aid}' and article_userid='${data.Uid}' `
    conn.query(select, (err, rows) => {
        // 判断此用户是否对该文章点赞
        if (rows.length === 0) {
            // 点赞成功
            // 点赞成功修改文章表信息
            const update = `update article set article_thumbs=article_thumbs+1 where article_id='${data.Aid}' `
            conn.query(update, (err, upda) => {
                // 数据库错误
                if (err) {
                    res.write(JSON.stringify({
                        return_code: '500',
                        return_str: '点赞失败',
                        return_err: err,
                    }))
                    res.end()
                    return
                }
                // 更新文章点赞表的信息
                const insert = `insert into article_thumbs values('${data.Aid}','${data.Uid}','${time}') `
                conn.query(insert, (err, msg) => {
                    // 数据库错误
                    if (err) {
                        res.write(JSON.stringify({
                            return_code: '500',
                            return_str: '点赞失败',
                            return_err: err,
                        }))
                        res.end()
                        return
                    }
                    res.write(JSON.stringify({
                        return_code: '200',
                        return_str: '点赞成功',
                    }))
                    res.end()
                    console.log(`用户：${data.Uid}点赞成功`)

                })
            })

        }
        else {
            res.write(JSON.stringify({
                return_code: '500',
                return_str: '您已经给这篇文章点过赞啦',
            }))
            res.end()
        }

    })

})

// 文章评论
Api.post("/FirstLevel_Com", (req, res) => {
    // 接收数据
    const data = {
        Aid: req.body.article_id,
        Uid: req.body.user_id,
        content: req.body.content,
    }
    // 验证接收的数据
    switch (true) {
        case data.Uid === '' || data.Uid === null:
            res.end(JSON.stringify({
                return_code: '500',
                return_str: '请登录后评论',
            }))
            break;
        case data.Aid === '' || data.Aid === null:
            res.end(JSON.stringify({
                return_code: '500',
                return_str: '文章：Null',
            }))
            break;
        case data.content === '' || data.content === null:
            res.end(JSON.stringify({
                return_code: '500',
                return_str: '内容：Null',
            }))
            break;
        // 验证通过操作数据库
        default:
            // 文章表评论数+1
            const update = `update article set article_comment=article_comment+1 where article_id='${data.Aid}' `
            conn.query(update, (err, prov) => {
                if (err) {
                    res.end(JSON.stringify({
                        return_code: '500',
                        return_str: '错误',
                        return_err: err,
                    }))
                    return
                }
                // 修改表成功 - 将数据保存到文章评论表
                const time = sd.format(new Date(), "YYYY-MM-DD H:m:s")
                // 随机评论ID
                const comment_id = randomString({
                    length: 13,
                    numeric: true,
                    letters: true,
                    special: false,
                });
                // 获取IP
                const requestIp = require('request-ip');
                const IP = requestIp.getClientIp(req)
                // 获取用户信息
                const select = `select ID,username,head_portrait from login_register where ID='${data.Uid}' `
                conn.query(select, (err, rows) => {
                    rows.filter(item => {
                        // 更新文章评论表数据
                        const insert = `insert into article_comm 
                        values('${data.Aid}','${data.content}','${item.head_portrait}','${item.ID}','${item.username}','${time}','${IP}','comm-${comment_id}') `
                        conn.query(insert, (err, prov1) => {
                            if (err) {
                                res.end(JSON.stringify({
                                    return_code: '500',
                                    return_str: '错误',
                                    return_err: err,
                                }))
                                return
                            }
                            res.end(JSON.stringify({
                                return_code: '200',
                                return_str: '评论成功',
                            }))
                        })
                        // 更新数据 - 结束
                    })
                })
                // 获取用户信息 - 结束
            })
        // 修改文章表评论数 - 结束
    }

})

// 文章回复评论
Api.post('/Reply_comment', (req, res) => {
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
            res.end(JSON.stringify({ return_code: '500', return_str: '请登录后评论' }))
            break;
        case data.content === '' || data.content === null:
            res.end(JSON.stringify({ return_code: '500', return_str: '回复内容：Null' }))
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
                            ('reply-${key}','${msg[0].ID}','${msg[0].username}','${msg[0].head_portrait}','${data.content}','${time}','评论','${data.by_reply_id}','${prove[0].username}','${data.pid}')`
                            conn.query(insert, (err, proveI) => {
                                if (err) {
                                    res.end(JSON.stringify({
                                        return_code: '500',
                                        return_str: '错误',
                                        return_err: err,
                                    }))
                                    return
                                }
                                res.end(JSON.stringify({
                                    return_code: '200',
                                    return_str: '评论成功',
                                }))
                            })
                            // 更新文章子评论表信息 - 结束
                        })
                })
    }

})


module.exports = Api