
const Pv = require('../model/pv')
module.exports = {
    getAll:(req,res,next)=>{
        Pv.getAll().then(results=>{
        req.pvs =results;
        next()
        }).catch(err=>{
            next(err)
        })
    },
    setTotal:(req,res,next)=>{
      
      
        Pv.setTotal(new Date()).then(results=>{
        req.pvs =results;
        next()
        }).catch(err=>{
            next(err)
        })
    },
}