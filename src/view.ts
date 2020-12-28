import { ipcRenderer } from 'electron'
import { electron } from 'webpack'
import { Constants } from './constants'
import { GetDatabases, GetTablesRequest } from './databaseConnector'

const databases_link = document.querySelector('#Databases') as HTMLLinkElement
const databases = document.querySelector('#Databases-div') as HTMLDivElement
const tables_link = document.querySelector('#Tables') as HTMLLinkElement
const tables = document.querySelector('#Tables-div') as HTMLDivElement

const add_to_list = (name: string, class_name: string,  src: HTMLElement)=>{
    src.innerHTML += `<a class="dropdown-item ${class_name}" href="#"> ${name} </a>`
}

const get_tables_respnse_key = (database_name: string|undefined): string => {
    return 'Tables_in_'+database_name
}

ipcRenderer.invoke(Constants.GET_DATABASES).then(
    (value: GetDatabases[])=>{
        databases.innerHTML = ""
        value.forEach((element: GetDatabases) => {
            add_to_list(element.Database, 'Database', databases)
        })
        const database = document.querySelectorAll('.Database') as NodeListOf<HTMLElement>
        database.forEach((value: HTMLElement, key: number, parent: NodeListOf<HTMLElement>)=>{
            value.addEventListener('click', (e: Event)=>{
                const element =  e.currentTarget as HTMLLinkElement
                console.log(element.textContent)
                const getDatabaseRequest: GetTablesRequest = {
                    Database: element.textContent?.trim()
                }
                tables.innerHTML = ""
                ipcRenderer.invoke(Constants.GET_TABLES, getDatabaseRequest).then(
                    (value: any)=>{
                        value.forEach((element:any) => {
                            add_to_list(element[get_tables_respnse_key(getDatabaseRequest.Database)], 'Table', tables)
                        });
                    },
                    (error: string)=>{
                        console.log(error)
                    }
                )
            })
        })
    },
    (error: string)=>{
        console.log(error)
    }
)