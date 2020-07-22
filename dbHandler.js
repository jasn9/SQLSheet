const mysql = require('mysql')

let con;

module.exports = {

    getMysqlConnection: function(args){
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
                    callback(error, result)
                })
            }
        })
    },

    getTableSchema: function(args, callback){
        var sql = "DESCRIBE "+args+";";
        con.query(sql, (error, data)=>{
            callback(error, data)
        })
    },

    getTableData: function(args, callback){
        var sql = "SELECT * FROM "+args+";";
        con.query(sql, (error, data)=>{
            callback(error, data)
        })
    },

    reset: function(){
        con = null
    }
}


