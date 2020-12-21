import mysql = require('mysql2')

export type DatabaseCredential = {
    host: string
    user: string
    password: string
}

export class Connector {
    private conn: mysql.Connection
    private static instance: Connector | null
    private constructor(conn: mysql.Connection){
        this.conn = conn
    }

    connect(): Promise<any> {
        return new Promise((resolve: (value: boolean)=>void, reject: (error: string)=>void)=>{
            this.conn.connect((error: mysql.QueryError|null)=>{
                if(error){
                    reject(error.message)
                }
                else{
                    resolve(true)
                }
            })
        });
    }

    end(){
        this.conn.end((err: mysql.QueryError|null)=>{
            if(err){
                console.log("Error: ", err.message)
            }
            else{
                console.log("Connection Eneded")
                Connector.instance = null
            }
        })
    }

    static CreateConnection(databaseCredential: DatabaseCredential): Promise<any>{
        let conn = mysql.createConnection(databaseCredential)
        console.log(conn)
        Connector.instance = new Connector(conn)
        return new Promise((resolve: (value: boolean)=>void, reject: (error: string)=>void)=>{
            Connector.instance!.connect().then(
            (value: boolean)=>{
                resolve(value)
            },
            (error: string)=>{
                reject(error)
            });
        });
    }
}