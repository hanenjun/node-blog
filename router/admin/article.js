const express = require('express');
const articleApp = express();
const user = require('../../middleware/user');
const article = require('../../middleware/article')
const category = require('../../middleware/category')
articleApp.get('/', [article.getCount], (req, res, next) => {

    let size = 5;
    req.page = {};
    req.page.count = req.count;
    req.page.total = Math.ceil(req.page.count.count / size)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p
    res.start = (req.page.p - 1) * size ? (req.page.p - 1) * size : 0;
    res.size = size
    next()
}, [article.getPage, category.getList], (req, res) => {
    let { page, user, pageList, Categorys } = req;
    page.list = pageList
    let { category_id, hot } = req.query;
    console.log(page)
    res.render('admin/article/index', { user: req.user, page, Categorys, category_id, hot })
})

articleApp.get('/sethot', article.setHot, (req, res) => {
    // console.log(req.affectedRows)
    if (req.affectedRows > 0) {
        res.json({ code: 1, mag: '设置成功' })
    } else {
        res.json({ code: 0, mag: '设置失败' })

    }
})
articleApp.get('/add', [category.getList], (req, res) => {
    let { Categorys } = req;
    res.render('admin/article/add', { user: req.user, Categorys, code: "" })
})

articleApp.post('/ckeditor', (req, res) => {
    if (req.uploadUrl) {
        res.json({
            uploaded: true,
            url: req.uploadUrl
        })
    } else {
        res.json({
            uploaded: false,
            err: { message: '上传失败' }
        })
    }
})

articleApp.post('/add', [category.getList], [article.add], (req, res) => {
    let { user, Categorys } = req;
    if (req.insertId) {
        res.render('admin/article/add', { user: req.user, Categorys, code: 1 })
    } else {
        res.render('admin/article/add', { user: req.user, Categorys, code: 2 })
    }
})
articleApp.get('/del', article.del, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: "成功" })
    } else { }
    res.json({ code: 2, msg: "失败" })
})
articleApp.get('/edit/:id', [category.getList,article.getArticleById], (req, res) => {
    let { Categorys ,Article} = req;
    res.render('admin/article/edit', { user: req.user, Categorys, code: "" ,Article})
})
articleApp.post('/edit',[article.edit], (req, res) => {
    if(req.affectedRows>0){
        res.render('admin/alert',{code:1,title:'成功',message:"成功",url:"/admin/article"})
    }
    else{
        res.render('admin/alert',{code:1,title:'失败',message:"失败",url:"/admin/article/edit"})
    }
})
module.exports = articleApp