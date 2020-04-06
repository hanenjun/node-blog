class Category extends require('./model'){
    static getList(){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT id,`name`,`index` FROM category ORDER BY `index` DESC'
            this.query(sql).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getNameById(id){
        return new Promise((resolve,reject)=>{
            let sql = `select id,name,'index' from category where id = ?`
            this.query(sql,id).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getCategoryCount(){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT count(1) as count from category' 
            this.query(sql).then(results=>{
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static add(name,index){
        return new Promise((resolve,reject)=>{
            let sql = 'INSERT INTO category (`name`,`index`) VALUES (?,?)'

            this.query(sql,[name,index]).then(results=>{
              resolve(results.insertId)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static del(id){
        return new Promise((resolve,reject)=>{
            let sql = 'DELETE FROM category WHERE id = ?'

            this.query(sql,id).then(results=>{
              resolve(results.affectedRows)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static setName(id,name){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE category SET `name` = ? WHERE id = ?'
            console.log(id,name)
            this.query(sql,[name,id]).then(results=>{
              resolve(results.affectedRows)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static setIndex(id,index){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE category SET `index` = ? WHERE id = ?'

            this.query(sql,[index,id]).then(results=>{
              resolve(results.affectedRows)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    
}
module.exports = Category;