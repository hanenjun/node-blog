class Log extends require('./model'){
    static getPage(start,size){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT handle,`time`,ip FROM `log` ORDER BY `time` DESC LIMIT ?,?'
            this.query(sql,[start,size]).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })  
    }

    static getCount(){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT count(1) as count FROM `log` '
            this.query(sql).then(results=>{
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })  
    }
    static add(log){
        return new Promise((resolve,reject)=>{
            let sql = 'INSERT INTO `log` SET ?'
            this.query(sql,log).then(results=>{
              resolve(results.affectedRows)
            }).catch(err=>{
                console.log(err)
            })
        })  
    }
}
module.exports = Log;