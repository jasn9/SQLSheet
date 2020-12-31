import { ipcRenderer } from 'electron'
import { electron } from 'webpack'
import { Constants } from './constants'
import { GetDatabases, GetTablesRequest } from './databaseConnector'

const databases_link = document.querySelector('#Databases') as HTMLLinkElement
const databasesDiv = document.querySelector('#Databases-div') as HTMLDivElement
const tables_link = document.querySelector('#Tables') as HTMLLinkElement
const tablesDiv = document.querySelector('#Tables-div') as HTMLDivElement

const add_to_list_tag = (name: string, class_name: string,  src: HTMLElement)=>{
    src.innerHTML += `<a class="dropdown-item ${class_name}" href="#"> ${name} </a>`
}

const get_table_name_from_response = (database_name: string|undefined): string => {
    return 'Tables_in_'+database_name
}

const get_database_request = (table: HTMLLinkElement):GetTablesRequest=>{
    const getDatabaseRequest: GetTablesRequest = {
        Database: table.textContent?.trim()
    }
    return getDatabaseRequest
}

const update_tables_tag = (tables: NodeListOf<HTMLElement>)=>{
    tables.forEach((table: HTMLElement)=>{
        table.addEventListener('click', (e: Event)=>{
          const table_element = e.currentTarget as HTMLElement
          console.log(table_element)   
        })
    })
}

const get_tables_response = (getDatabaseRequest: GetTablesRequest)=>{
    tablesDiv.innerHTML = ""
    ipcRenderer.invoke(Constants.GET_TABLES, getDatabaseRequest).then(
        (tables: any)=>{
            tables.forEach((element:any) => {
            add_to_list_tag(element[get_table_name_from_response(getDatabaseRequest.Database)], 'Table', tablesDiv)
            const tablesList = document.querySelectorAll('.Table') as NodeListOf<HTMLLinkElement>
            update_tables_tag(tablesList)
        });
        },
        (error: string)=>{
            console.log(error)
        }
    )
}

const update_tables_list = (databases: NodeListOf<HTMLElement>)=>{
    databases.forEach((database: HTMLElement, key: number, parent: NodeListOf<HTMLElement>)=>{
        database.addEventListener('click', (e: Event)=>{
            const getDatabaseRequest = get_database_request(e.currentTarget as HTMLLinkElement)
            get_tables_response(getDatabaseRequest)
        })
    })
}

ipcRenderer.invoke(Constants.GET_DATABASES).then(
    (getDatabases: GetDatabases[])=>{
        databasesDiv.innerHTML = ""
        getDatabases.forEach((getDatabase: GetDatabases) => {
            add_to_list_tag(getDatabase.Database, 'Database', databasesDiv)
        })
        const database = document.querySelectorAll('.Database') as NodeListOf<HTMLElement>
        update_tables_list(database)
    },
    (error: string)=>{
        console.log(error)
    }
)