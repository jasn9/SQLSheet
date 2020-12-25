import { ipcRenderer } from 'electron'
import { electron } from 'webpack'
import { Constants } from './constants'
import { GetDatabases } from './databaseConnector'

const databases_link = document.querySelector('#Databases') as HTMLLinkElement
const databases = document.querySelector('#Databases-div') as HTMLDivElement
const tables_link = document.querySelector('#Tables') as HTMLLinkElement
const tables = document.querySelector('#Tables-div') as HTMLDivElement



const add_to_list = (name: string, src: HTMLElement)=>{
    src.innerHTML += `<a class="dropdown-item" href="#"> ${name} </a>`
}

databases_link.addEventListener('click', (e: Event)=>{
    console.log("event fired")
    ipcRenderer.invoke(Constants.GET_DATABASES).then(
        (value: GetDatabases[])=>{
            databases.innerHTML = ""
            value.forEach((element: GetDatabases) => {
                add_to_list(element.Database, databases)
            });
        },
        (error: string)=>{
            console.log(error)
        }
    )
})