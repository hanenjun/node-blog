const Artice = require('../model/article')
const Tab = require('../model/tab')
module.exports = {
    getHot:(req,res,next)=>{
        Artice.getHot(3).then(results=>{
            req.hots = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getList:(req,res,next)=>{
        Artice.getList().then(results=>{
            req.articeList = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getListByCategoryId:(req,res,next)=>{
        let id = req.params.id;
        Artice.getListByCategoryId(id).then(results=>{
            req.articeByIdList = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getListByKeyWord:(req,res,next)=>{
        let keyWord = req.query.keyword;
        Artice.getListByKeyWord(keyWord).then(results=>{
            req.articeKeyWord = results
            next();
        }).catch(err=>{
            next(err);
        })
    },
    getArticleById:(req,res,next)=>{
        let id = req.params.id;
        Artice.getArticleById(id).then(results=>{
            req.Article = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getTabs:(req,res,next)=>{
        let id = req.params.id;
        Tab.getListByAarticleId(id).then(results=>{
            req.tabs = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getPrev:(req,res,next)=>{
        let id = req.params.id;
        Artice.getPrevArticle(id).then(results=>{
            req.prev = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getNext:(req,res,next)=>{
        let id = req.params.id;
        Artice.getNextArticle(id).then(results=>{
            req.next = results
                        next();
        }).catch(err=>{
            next(err)
        })
    },
    getCount:(req,res,next)=>{
        let id = req.params.id;
        Artice.getCount(req.query.category_id,req.query.hot).then(results=>{
            req.count = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getPage:(req,res,next)=>{
        Artice.getPage(res.start,res.size,req.query.category_id,req.query.hot).then(results=>{
            req.pageList = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    setHot:(req,res,next)=>{
        let {id,hot} = req.query
        Artice.setHot(id,hot).then(results=>{
          
            req.affectedRows = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    add: (req, res, next) => {
        let { title, content, hot, category_id } = req.body
        let article = {
            title: title,
            content: content,
            hot: hot ? 1 : 0,
            category_id: category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : null
        }
        console.log(article)
        Artice.add(article).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    del:(req,res,next)=>{
        let {id} = req.query
        Artice.del(id).then(results=>{
     
            req.affectedRows = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    edit:(req,res,next)=>{
        let {title,content,hot,category_id,thumbnail,id} = req.body
        let article = {
            title,content,hot:hot?1:0,category_id,thumbnail:req.uploadUrl?req.uploadUrl:thumbnail,id
        }
        Artice.edit(article).then(results=>{
     
            req.affectedRows = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
}