import { ipcRenderer } from 'electron'
import { electron } from 'webpack'
import { Constants } from './constants'
import { GetDatabases, GetDataRequest, GetTablesRequest } from './databaseConnector'

const databasesDiv = document.querySelector('#Databases-div') as HTMLDivElement
const tablesDiv = document.querySelector('#Tables-div') as HTMLDivElement

const addToListTag = (name: string, className: string,  src: HTMLElement)=>{
    src.innerHTML += `<a class="dropdown-item ${className}" href="#"> ${name} </a>`
}

const getTableNameFromResponse = (databaseName: string|undefined): string => {
    return 'Tables_in_'+databaseName
}

const getTablesReq = (table: HTMLLinkElement):GetTablesRequest=>{
    const getTablesRequest: GetTablesRequest = {
        Database: table.textContent?.trim()
    }
    return getTablesRequest
}

const getDataReq = (table: HTMLElement): GetDataRequest=>{
    const getDataRequest: GetDataRequest={
        Table: table.textContent?.trim()
    }
    return getDataRequest
}

const handelTableSelect = (table: HTMLElement)=>{
    const getDataRequest: GetDataRequest = getDataReq(table)
    ipcRenderer.invoke(Constants.GET_DATA, getDataRequest).then(
        (value: any)=>{
            console.log(value)
        },
        (error: string)=>{
            console.log(error)
        }
    )
}

const updateTablesTag = (tables: NodeListOf<HTMLElement>)=>{
    tables.forEach((table: HTMLElement)=>{
        table.addEventListener('click', (e: Event)=>{
          const tableElement = e.currentTarget as HTMLElement
          handelTableSelect(tableElement)
        })
    })
}

const handleDatabaseSelect = (getTablesRequest: GetTablesRequest)=>{
    tablesDiv.innerHTML = ""
    ipcRenderer.invoke(Constants.GET_TABLES, getTablesRequest).then(
        (tables: any)=>{
            tables.forEach((element:any) => {
            addToListTag(element[getTableNameFromResponse(getTablesRequest.Database)], 'Table', tablesDiv)
            const tablesList = document.querySelectorAll('.Table') as NodeListOf<HTMLLinkElement>
            updateTablesTag(tablesList)
        });
        },
        (error: string)=>{
            console.log(error)
        }
    )
}

const updateDatabaseTag = (databases: NodeListOf<HTMLElement>)=>{
    databases.forEach((database: HTMLElement, key: number, parent: NodeListOf<HTMLElement>)=>{
        database.addEventListener('click', (e: Event)=>{
            const getTablesRequest = getTablesReq(e.currentTarget as HTMLLinkElement)
            handleDatabaseSelect(getTablesRequest)
        })
    })
}

ipcRenderer.invoke(Constants.GET_DATABASES).then(
    (getDatabases: GetDatabases[])=>{
        databasesDiv.innerHTML = ""
        getDatabases.forEach((getDatabase: GetDatabases) => {
            addToListTag(getDatabase.Database, 'Database', databasesDiv)
        })
        const database = document.querySelectorAll('.Database') as NodeListOf<HTMLElement>
        updateDatabaseTag(database)
    },
    (error: string)=>{
        console.log(error)
    }
)