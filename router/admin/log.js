const express = require('express');
const logApp = express();
const user = require('../../middleware/user');
const log = require('../../middleware/log')
logApp.get('/',[log.getCount],(req,res,next)=>{
    let page = {
        p:req.query.p?req.query.p:1,
        count:req.count,
        size:3
    }
    console.log(page)
    page.total = Math.ceil(page.count.count/page.size);
    page.p =  page.p>page.total?page.total:page.p;
    page.p = page.p<1?1:page.p;
    req.page=page
    let {logs} = req
    next()
},log.getPage,(req,res)=>{
    let {page} = req
    res.render('admin/log',{user:req.user,page})
})

module.exports=logApp