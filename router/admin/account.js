const express = require('express');
const accountApp = express();
const user = require('../../middleware/user');

accountApp.get('/',user.getuser,(req,res)=>{
    res.render('admin/account',{user:req.user,loginuser:req.loginuser})
})
accountApp.post('/add',user.setuser,(req,res)=>{
    
    res.render('admin/alert.html',{code:1,title:"成功",message:"成功",url:"/admin"})
})
module.exports=accountApp