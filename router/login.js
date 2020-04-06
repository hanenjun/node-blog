const express= require('express');
const loginApp = express();
const User = require('../model/user')
const log = require('../middleware/log')
loginApp.get('/',(req,res)=>{
    res.render('login',{msg:""})
})
loginApp.post('/',(req,res,next)=>{
    let {username,password} = req.body;
     User.login(username,password).then(results=>{
         if(results){
             req.log={
                 time:new Date(),
                 handle:"登入操作",
                 ip:req.ip
             }
             console.log(req.log)
             log.add(req,res,next)
             req.session.user = results
         res.redirect('/')
         }else{
            res.render('login',{msg:"登录失败"})
         }
         next();
     }).catch(err=>{
         next(err)
     })
 })

module.exports = loginApp;