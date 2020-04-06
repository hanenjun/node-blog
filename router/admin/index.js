const express = require('express');
const indexApp = express();
const user = require('../../middleware/user');
const article = require('../../middleware/article');
const Category = require('../../middleware/category');
const Pv = require('../../middleware/pv.js')
indexApp.get('/',[user.listLoginTime,user.totals,article.getCount,Category.getCategoryCount],(req,res)=>{
    let {user} = req.session;
    let {loginTime,totals,count,CategoryCount} = req;
    res.render('admin/index.html',{user,loginTime,totals,count,CategoryCount})
})

indexApp.get('/pvs',[Pv.getAll],(req,res)=>{
    let {pvs} = req
    let data = {}
    data.data = pvs
    data.start = pvs[0].time
    data.end = pvs[pvs.length-1].time
    res.json(data)
})

module.exports=indexApp