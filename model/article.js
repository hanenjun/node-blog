class Article extends require('./model'){
    static getHot(num){
        return new Promise((resolve,reject)=>{
            let sql = `select id,title,content,time,thumbnail  from article where hot = 1 limit ?`
            this.query(sql,num).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getList(){
        return new Promise((resolve,reject)=>{
            let sql = `select id,title,content,time,thumbnail from article order by time desc`
            this.query(sql).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getListByCategoryId(id){
        return new Promise((resolve,reject)=>{
            let sql = `select id,title,content,time,thumbnail from article where category_id = ? order by time desc`
            this.query(sql,id).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getListByKeyWord(keyWord){
        return new Promise((resolve,reject)=>{
            let sql = `select id,title,content,time from article where title like ? order by time desc`
            this.query(sql,`%${keyWord}%`).then(results=>{
              resolve(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getArticleById(id){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT a.id,a.title,a.content,a.`time`,a.hits,a.`category_id`,c.`name`,a.`thumbnail`,a.`hot`,a.`thumbnail` FROM article a,category c WHERE a.`category_id` = c.`id` AND a.id = ?'
            this.query(sql,id).then(results=>{
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getPrevArticle(id){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT id,title from article where id < ? order by id desc limit 1'
            this.query(sql,id).then(results=>{
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getNextArticle(id){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT id,title from article where id > ? order by id asc limit 1'
            this.query(sql,id).then(results=>{
              resolve(results[0])
        
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getCount(category_id,hot){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT count(1) as count from article where 1=1 ' ;
            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : ''
            sql += hot != -1 && hot ? ` AND hot=${hot}` : ''

            console.log(sql)

            this.query(sql).then(results=>{
              resolve(results[0])
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static getPage(start,size,category_id,hot){
        return new Promise((resolve,reject)=>{
            let sql = `select id,title,thumbnail,hot from article where 1=1 `
            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : ''
            sql += hot != -1 && hot ? ` AND hot=${hot}` : ''

            sql+=' order by time desc limit ?,?'
            console.log(sql)
            this.query(sql,[start,size]).then(results=>{
              resolve(results)
              console.log(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static setHot(id,hot){
        return new Promise((resolve,reject)=>{
            let sql = 'update article set hot =? where id = ?'
            this.query(sql,[hot,id]).then(results=>{
              resolve(results.affectedRows)
            //   console.log(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static add(article){
        return new Promise((resolve,reject)=>{
            console.log(article)
            let sql = 'insert into article set ?'
            this.query(sql,article).then(results=>{
              resolve(results.insertId)
            //   console.log(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static del(id){
        return new Promise((resolve,reject)=>{
            let sql = 'delete from article where id = ?'
            this.query(sql,id).then(results=>{
              resolve(results.affectedRows)
            //   console.log(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    static edit(article){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE article SET title = ?, content = ?, hot = ?, category_id = ?, thumbnail = ? WHERE id = ?'
            this.query(sql,[article.title,article.content,article.hot,article.category_id,article.thumbnail,article.id]).then(results=>{
              resolve(results.affectedRows)
            //   console.log(results)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
}
module.exports = Article;