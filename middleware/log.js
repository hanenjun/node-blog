
const Log = require('../model/log')
module.exports = {
    getPage:(req,res,next)=>{
        let {page} = req
        let {p,size} = page
        Log.getPage((p-1)*size,size).then(results=>{
        req.page.list =results;
        next()
        }).catch(err=>{
            next(err)
        })
    },
    getCount:(req,res,next)=>{
        Log.getCount().then(results=>{
        req.count =results;
        next()
        }).catch(err=>{
            next(err)
        })
    },
    add:(req,res)=>{
        Log.add(req.log).then(results=>{
            req.count =results;
            next()
            }).catch(err=>{
                next(err)
            })
    }
}