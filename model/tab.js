class Tab extends require('./model'){
    static getListByAarticleId(id){
        return new Promise((resolve,reject)=>{
            let sql = `select id,name from tabs where article_id = ?`
            this.query(sql,id).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })  
    }
}
module.exports = Tab;