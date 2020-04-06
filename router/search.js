const express = require('express');
const searchApp =express();
const artice = require('../middleware/article');
const category = require('../middleware/category');
const auth = require('../middleware/auth.js');
searchApp.use(auth.getUser)
searchApp.get('/',[artice.getListByKeyWord,category.getList],(req,res)=>{
    let {articeKeyWord,Categorys,user} = req; 
    res.render('search',{articeKeyWord,Categorys,keyWord:req.query.keyword,user})
})

 module.exports = searchApp;