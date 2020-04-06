const express = require('express');
const categoryApp = express();
const user = require('../../middleware/user');
const category = require('../../middleware/category')
categoryApp.get('/',[category.getList],(req,res)=>{
    let {user,Categorys} = req
    console.log(Categorys)
    res.render('admin/category',{user:req.user,Categorys})
})
categoryApp.post('/add',category.add,(req,res)=>{
    if(req.insertId){
        res.json({code:1,msg:"成功"})
    }
    else{
        res.json({code:0,msg:"失败"})
    }
})
categoryApp.get('/del',category.del,(req,res)=>{
    if(req.affectedRows>0){
        res.json({code:1,msg:"成功"})
    }
    else{
        res.json({code:0,msg:"失败"})
    }
})
categoryApp.post('/setname',[category.setName],(req,res)=>{
    if(req.affectedRows>0){
        res.json({code:1,msg:"成功"})
    }
    else{
        res.json({code:0,msg:"失败"})
    }
})
categoryApp.post('/setindex',[category.setIndex],(req,res)=>{
    if(req.affectedRows>0){
        res.json({code:1,msg:"成功"})
    }
    else{
        res.json({code:0,msg:"失败"})
    }
})
module.exports=categoryApp