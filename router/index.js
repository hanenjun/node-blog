const express= require('express');
const indexApp = express();
const article = require('../middleware/article');
const Category = require('../middleware/category');
const auth = require('../middleware/auth.js');
const pv= require('../middleware/pv')
indexApp.use(auth.getUser)
indexApp.get('/',[article.getHot,article.getList,Category.getList,pv.setTotal],(req,res)=>{
    let {hots,articeList,Categorys,user,}=req;
    res.render('index',{hots,articeList,Categorys,user})
})
module.exports = indexApp;
