class User extends require('./model'){
    static login(username,password){
        return new Promise((resolve,reject)=>{
            let sql = `select id,username from user where username = ? and password = ?`
            this.query(sql,[username,password]).then(results=>{
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static listLoginTime(){
        return new Promise((resolve,reject)=>{
            let sql = "SELECT time FROM `log` WHERE handle = '登录' order by 'time' desc limit 1"
            this.query(sql).then(results=>{
                console.log(results[0])
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getuser(user){
        return new Promise((resolve,reject)=>{
            let sql = "SELECT username,password,id from user where username = ?"
            this.query(sql,user).then(results=>{
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static setuser(obj){
        return new Promise((resolve,reject)=>{
            let {password,username,id}=obj
            let sql = 'UPDATE user SET username = ?, password = ? WHERE id = ?'
            this.query(sql,[username,password,id]).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
}
module.exports = User;