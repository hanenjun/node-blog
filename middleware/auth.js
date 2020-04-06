module.exports = {
    getUser:(req,res,next)=>{
        req.user = req.session.user
        next()
    },
    allowToAdmin:(req,res,next)=>{
        let user = req.session.user
        if(user){
            req.user = user;
            next()
        }else{
            res.redirect('/login')
            console.log(user)
            next()
        }
    }
}