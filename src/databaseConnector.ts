import mysql = require('mysql')

export type DatabaseCredential = {
    host: string
    user: string
    password: string
}

export class Connector {
    private conn: mysql.Connection
    private static instance: Connector
    private constructor(conn: mysql.Connection){
        this.conn = conn
    }
    static CreateConnection(databaseCredential: DatabaseCredential): boolean{
        let conn = mysql.createConnection(databaseCredential)
        if(conn==null){
            return false
        }
        Connector.instance = new Connector(conn)
        return true
    }
    static getInstance(): Connector{
        return Connector.instance
    }
}