class Pv extends require('./model'){
    static getTotal(){
        return new Promise((resolve,reject)=>{
            let sql = `select sum(hits) as total from pv`
            this.query(sql).then(results=>{
                // console.log(results)
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })  
    }
    static getAll(){
        return new Promise((resolve,reject)=>{
            let sql = `select time,hits from pv order by 'time' asc`
            this.query(sql).then(results=>{
                console.log(results)
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })  
    }
    static setTotal(time){
        return new Promise((resolve,reject)=>{
            let sql = "INSERT INTO `pv`(`time`) VALUES (?)"
          

            this.query(sql,time).then(results=>{
                // console.log(results)
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })  
    }
}
module.exports = Pv;