//1.全局模块（不需要require）

//  console.log(process.env);  //打印出windows系统中的环境变量

/**
 * input: node index.js
 * output:
 * [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\180490\\Desktop\\node\\index.js'
]
*/
// console.log(process.argv);

/**
 * input: node index.js 3 4
 * output:7
 */
// let a = parseInt(process.argv[2]);
// let b = parseInt(process.argv[3]);
// console.log(a + b);


//2.系统模块(需要require)

// let path = require('path');
let fs = require('fs');

// console.log(path.dirname('/node/a/b/c/1.jpg'));    //    /node/a/b/c
// console.log(path.basename('/node/a/b/c/1.jpg'));   //    1.jpg
// console.log(path.extname('/node/a/b/c/1.jpg'));    //    .jpg
// console.log(path.resolve(__dirname,'index.js'));   //    根路径：C:\Users\180490\Desktop\node\index.js

// 异步读文件
// fs.readFile('./a.text',(err,data) => {
//     if(err){
//         console.log(err);
//     }else {
//         console.log(data.toString())   
//     }
// })


//同步读文件，没有回调函数
// let data = fs.readFileSync('./a.text');
// console.log(data.toString());



//{flag:"a"} a表示append追加，不写为替换
// fs.writeFile('b.text','哈哈哈哈哈', {flag:"a"},(err)=>{
//   if(err){
//       throw err
//   }
// })

// let data = fs.writeFileSync('b.text','啦啦啦啦啦')
// console.log(data)   //undefined


//3.自定义模块（exports,module ,require）

/**
 * require
 * 1.如果有路径，就去路径里面找
 * 2.没有的话就去node_modules里面找
 * 3.再去node的安装目录里面找
 */
// const mod1 = require('./mod.js')  //此处必须加./


// mod1(); 
// let p = new mod1('wang');
// p.show();



//http模块

let http = require('http')
let url = require('url')   //利用url处理get请求

//访问8080/1.html
// http.createServer((req,res)=>{
//     fs.readFile(`./${req.url}`,(err,data) => {
//         if(err){
//             res.writeHead(404)
//             res.end('404 not found')
//         }else{
//             res.write(data)
//             res.end()
//         }
//     })   
// }).listen(8080)


// http.createServer((req,res)=>{
//    console.log(req.url)
//    console.log(url.parse(req.url))
//    console.log(url.parse(req.url,true))
// }).listen(8080)


let querystring = require('querystring')   //利用querystring处理post请求

http.createServer((req, res) => {
    let result = []
    req.on('data',buffer=>{
      result.push(buffer)
    })
    req.on('end',()=>{
      let data =   Buffer.concat(result)
      console.log(data);
      console.log(data.toString());
      console.log(querystring.parse(data.toString()));
    })
}).listen(8080)