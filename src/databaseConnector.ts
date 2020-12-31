import mysql = require('mysql2')
import { Constants } from './constants'

export type DatabaseCredential = {
    host: string
    user: string
    password: string
}

export type GetDatabases = {
    Database: string
}

export type GetTablesRequest = {
    Database: string | undefined
}

export type GetDataRequest = {
    Table: string | undefined
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

    getDatabase(): Promise<any> {
        return new Promise((resolve: (value: GetDatabases[])=>void, reject: (error: string)=>void)=>{
            const Query = Constants.GET_DATABASE_QUERY
            this.conn.query(Query, (error: mysql.QueryError|null, result: any)=>{
                if(error){
                   reject(error.message)
                }
                else{
                    resolve(result)
                }
            })
        })
        
    }

    useDatabase(database: string|undefined): Promise<any> {
        return new Promise((resolve: (value: boolean)=>void, reject: (error: string)=>void)=>{
            const Query = Constants.USE_DATABASE_QUERY + database + Constants.SEMI_COLON
            this.conn.query(Query, (error: mysql.QueryError|null, result: any)=>{
                if(error){
                    reject(error.message)
                }
                else{
                    resolve(true)
                }
            })
        })
    }

    getTables(getTablesRequest: GetTablesRequest): Promise<any> {
        return new Promise((resolve: (value: any)=>void, reject: (error: string)=>void)=>{
            this.useDatabase(getTablesRequest.Database).then(
                (value: boolean)=>{
                    const Query = Constants.GET_TABLES_QUERY
                    this.conn.query(Query, (error: mysql.QueryError|null, result: any)=>{
                        if(error){
                            reject(error.message)
                        }
                        else{
                            resolve(result)
                        }
                    })
                },
                (error: string)=>{
                    reject(error)
                }
            )
            
        })
    }

    getData(getDataRequest: GetDataRequest): Promise<any> {
        return new Promise((resolve: (value: any)=>void, reject: (error: string)=>void)=>{
            const Query = Constants.GET_DATA_QUERY + Constants.SPACE + getDataRequest.Table + Constants.SEMI_COLON
            this.conn.query(Query, (error: mysql.QueryError|null, result: any)=>{
                if(error){
                    reject(error.message)
                }
                else{
                    resolve(result)
                }
            })
        })
    }

    end(): void {
        this.conn.end((err: mysql.QueryError|null)=>{
            if(err){
                console.log("Error: ", err.message)
            }
            else{
                console.log("Connection Ended")
                Connector.instance = null
            }
        })
    }

    static CreateConnection(databaseCredential: DatabaseCredential): Promise<any> {
        let conn = mysql.createConnection(databaseCredential)
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

    static getInstance(): Connector{
        return Connector.instance!
    }
}