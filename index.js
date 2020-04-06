//入口
const express = require('express');
//创建主应用
const app = express();
const fs = require('fs')
const multer = require('multer')
const path = require('path')
//配置模板引擎
app.set('view engine','html');
app.set('views',`${__dirname}/views`);
app.engine('html',require("ejs").renderFile);
//配置post请求处理
app.use(express.urlencoded({extended:true}))
//配置静态资源
//cookis-session
// 上传配置
const upload = multer({
    dest: './static/upload', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 2 // 单个文件大小限制在2M以内
    }
})

const session = require('cookie-session');
app.use(session({
    keys:['secret'],
    maxAge:1000*60*30
}))
app.use((req,res,next)=>{
    req.session.nowInMinutes = Math.floor(Date.now()/60e3)
    next()
})
app.use(express.static('static'));
//配置路由
app.use(/\/(index)?/,require('./router/index'));
app.use('/article',require('./router/artice'));
app.use('/search',require('./router/search'));
app.use('/login',require('./router/login'));

app.use('/admin/?*',require('./middleware/auth').allowToAdmin)
app.post('/admin/*', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})
app.use(/\/admin\/(index)?/, require('./router/admin/index'))
app.use('/admin/article', require('./router/admin/article'))
app.use('/admin/category', require('./router/admin/category'))
app.use('/admin/log', require('./router/admin/log'))
app.use('/admin/account', require('./router/admin/account'))

//退出操作
app.get('/user/logout',(req,res)=>{
    req.session.user = null
    res.render('login',{msg:"推出成功"})
})

// 上传操作

//监听端口
app.listen(8080);