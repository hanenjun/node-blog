const user = require('../model/user')
const Pv = require('../model/pv')
const account = require('../model/user')
module.exports = {
    listLoginTime:(req,res,next)=>{
        user.listLoginTime().then(results=>{
        req.loginTime =results;
        next()
        }).catch(err=>{
            next(err)
        })
    },
    totals:(req,res,next)=>{
        Pv.getTotal().then(results=>{
            
        req.totals =results;
        next()
        }).catch(err=>{
            next(err)
        })
    },
    getuser:(req,res,next)=>{
        user.getuser(req.user.username).then(results=>{
            req.loginuser =results;
            next()
            }).catch(err=>{
                next(err)
            })
    },
    setuser:(req,res,next)=>{
        
        let {password,username,id} = req.body
        let user ={password,username,id}
        console.log(user)
        account.setuser(user).then(results=>{
            req.loginuser =results;
            next()
            }).catch(err=>{
                next(err)
            })
    }
}