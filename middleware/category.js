const Category = require('../model/category')
module.exports = {
    getList:(req,res,next)=>{
        Category.getList().then(results=>{
            req.Categorys = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getNameById:(req,res,next)=>{
        let id = req.params.id;

    
        Category.getNameById(id).then(results=>{
            req.Category = results[0];
            next();
        }).catch(err=>{
            next(err)
        })
    },
    getCategoryCount:(req,res,next)=>{
        Category.getCategoryCount().then(results=>{
            req.CategoryCount = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    add:(req,res,next)=>{
        let {name,index} = req.body
       
        Category.add(name,index).then(results=>{
            req.insertId = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    del:(req,res,next)=>{
        let {id} = req.query
       
        Category.del(id).then(results=>{
            req.affectedRows = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    setName:(req,res,next)=>{
        let {id,name} = req.body
        console.log(id,name)
       
        Category.setName(id,name).then(results=>{
            req.affectedRows = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
    setIndex:(req,res,next)=>{
        let {id,index} = req.body
       
        Category.setIndex(id,index).then(results=>{
            req.affectedRows = results
            next();
        }).catch(err=>{
            next(err)
        })
    },
}