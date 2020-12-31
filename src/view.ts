import { ipcRenderer } from 'electron'
import { electron } from 'webpack'
import { Constants } from './constants'
import { GetDatabases, GetTablesRequest } from './databaseConnector'

const databases_link = document.querySelector('#Databases') as HTMLLinkElement
const databases = document.querySelector('#Databases-div') as HTMLDivElement
const tables_link = document.querySelector('#Tables') as HTMLLinkElement
const tables = document.querySelector('#Tables-div') as HTMLDivElement

const add_to_list_tag = (name: string, class_name: string,  src: HTMLElement)=>{
    src.innerHTML += `<a class="dropdown-item ${class_name}" href="#"> ${name} </a>`
}

const get_table_name_from_response = (database_name: string|undefined): string => {
    return 'Tables_in_'+database_name
}

const get_database_request = (element: HTMLLinkElement):GetTablesRequest=>{
    const getDatabaseRequest: GetTablesRequest = {
        Database: element.textContent?.trim()
    }
    return getDatabaseRequest
}

const get_tables_response = (getDatabaseRequest: GetTablesRequest)=>{
    tables.innerHTML = ""
    ipcRenderer.invoke(Constants.GET_TABLES, getDatabaseRequest).then(
        (value: any)=>{
            value.forEach((element:any) => {
            add_to_list_tag(element[get_table_name_from_response(getDatabaseRequest.Database)], 'Table', tables)
        });
        },
        (error: string)=>{
            console.log(error)
        }
    )
}

const update_tables_list = (database: NodeListOf<HTMLElement>)=>{
    database.forEach((value: HTMLElement, key: number, parent: NodeListOf<HTMLElement>)=>{
        value.addEventListener('click', (e: Event)=>{
            const getDatabaseRequest = get_database_request(e.currentTarget as HTMLLinkElement)
            get_tables_response(getDatabaseRequest)
        })
    })
}

ipcRenderer.invoke(Constants.GET_DATABASES).then(
    (value: GetDatabases[])=>{
        databases.innerHTML = ""
        value.forEach((element: GetDatabases) => {
            add_to_list_tag(element.Database, 'Database', databases)
        })
        const database = document.querySelectorAll('.Database') as NodeListOf<HTMLElement>
        update_tables_list(database)
    },
    (error: string)=>{
        console.log(error)
    }
)