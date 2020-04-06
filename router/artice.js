const express = require('express');
const articeApp =express();
const artice = require('../middleware/article');
const category = require('../middleware/category');
const auth = require('../middleware/auth.js');
articeApp.use(auth.getUser)
 articeApp.get('/list/:id',[artice.getListByCategoryId,category.getList,category.getNameById],(req,res)=>{
     let {articeByIdList,Categorys,Category,user} = req;
     
     res.render('list',{articeByIdList,Categorys,Category,user})
 })
articeApp.get('/:id',[category.getList,artice.getArticleById,artice.getTabs,artice.getPrev,artice.getNext],(req,res)=>{
    let {Categorys,Article,tabs,prev,next,user} = req;
    res.render('article',{Categorys,Article,tabs,prev,next,user})
})
 module.exports = articeApp;