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
    static CreateConnection(databaseCredential: DatabaseCredential): void{
        let conn = mysql.createConnection(databaseCredential)
        Connector.instance = new Connector(conn)
    }
    static getInstance(): Connector{
        return Connector.instance
    }
}