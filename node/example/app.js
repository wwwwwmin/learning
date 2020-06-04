const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring')



let user = {
    admin: 123456
}

http.createServer((req, res) => {
    let path, get, post
    if (req.method == 'GET') {
        let { pathname, query } = url.parse(req.url, true)
        path = pathname
        get = query
        complete();
       
    } else if (req.method == 'POST') {
        let arr = []
        path = req.url
        req.on('data', buffer => {
            arr.push(buffer)
        })
        req.on('end', () => {
            post = querystring.parse(Buffer.concat(arr).toString())
            complete();//end事件为异步请求，必须写在这里才能拿到post
        })
    }
    
   
    function complete() {
       

        if (path == '/login') {
            res.writeHead(200,{
                "Content-Type":"text/plain;charset=utf-8"
             })
            let { username, password } = get
            if (!user[username]) {
                res.end(JSON.stringify({
                    err: 1,
                    msg: "用户名不存在"
                })
                )
            } else if (user[username] != password) {
                res.end(JSON.stringify({
                    err: 1,
                    msg: '密码错误'
                }))
            } else {
                res.end(JSON.stringify({
                    err: 0,
                    msg: "登录成功"
                }))
            }
        } else if (path == '/reg') {
            res.writeHead(200,{
                "Content-Type":"text/plain;charset=utf-8"
             })
            let { username, password } = post
            if(user[username]){
                res.end(JSON.stringify({
                    err: 1,
                    msg: '用户已存在'
                }))
            }else{
                user[username] = password
                res.end(JSON.stringify({
                    err: 0,
                    msg: "注册成功"
                }))
            }
        }else{
            fs.readFile(`./${path}`,(err,data) => {
                if(err){
                    res.end('404')
                }else{
                    res.end(data)
                }
            })
        }
    }
}).listen(8080)