const mysql = require('mysql')

let con;

module.exports = {

    getMysqlConnection: function(args){
        console.log(args)
        con =  mysql.createConnection({
            host: args['host'],
            port: args['port'],
            user: args['user'],
            password: args['password'],
            database: args['database']
            // host: 'localhost',
            // port: '3306',
            // user: 'root'
        });
        return con
    },

    getDatabases: function(callback){
        var sql = "SHOW DATABASES;"
        con.query(sql, (error, result)=>{
            console.log(result)
            callback(error, result)
        })
    },

    getTables: function(args, callback){
        var sql = "USE "+args+";";
        con.query(sql, (error, data)=>{
            if(error){
                callback(error, null)
            }else{
                sql = "SHOW TABLES;";
                con.query(sql, (error, result)=>{
                    console.log(result)
                    callback(error, result)
                })
            }
        })
    },

    reset: function(){
        con = null
    }
}


