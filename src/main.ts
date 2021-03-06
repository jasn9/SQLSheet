import { app, BrowserWindow, ipcMain, IpcMain, ipcRenderer } from 'electron'
import { DatabaseCredential, Connector, GetDatabases, GetTablesRequest, GetDataRequest } from './databaseConnector'
import { Constants  } from './constants'

let win: BrowserWindow;

let createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./public/index.html')
}

app.whenReady().then(createWindow)

ipcMain.handle(Constants.DATABASE_CONNECTION_REQUEST, (e: Electron.IpcMainInvokeEvent, args: DatabaseCredential): Promise<any>=>{
    return new Promise((resolve: (value: boolean)=>void, reject: (reason: string)=>void)=>{
      Connector.CreateConnection(args).then(
        (value: boolean)=>{
          resolve(value)
        },
        (error: string)=>{
          reject(error)
        }
      );
    });
});

ipcMain.on(Constants.VIEW_DB, (e: Electron.IpcMainInvokeEvent)=>{
  win.loadFile('./public/view.html')
})

ipcMain.handle(Constants.GET_DATABASES, (e: Electron.IpcMainInvokeEvent, args: any): Promise<any>=>{
  return new Promise((resolve: (value: any)=>void, reject: (error: string)=>void)=>{
    Connector.getInstance().getDatabase().then(
      (value: GetDatabases[])=>{
        resolve(value)
      },
      (error: string)=>{
        reject(error)
      }
    )
  })
})

ipcMain.handle(Constants.GET_TABLES, (e: Electron.IpcMainInvokeEvent, args: GetTablesRequest): Promise<any>=>{
  return new Promise((resolve: (value: any)=>void, reject: (error: string)=>void)=>{
    Connector.getInstance().getTables(args).then(
      (value: any)=>{
        resolve(value)
      },
      (error: string)=>{
        reject(error)
      }
    )
  })
})

ipcMain.handle(Constants.GET_DATA, (e: Electron.IpcMainInvokeEvent, args: GetDataRequest): Promise<any>=>{
  return new Promise((resolve: (value: any)=>void, reject: (error: string)=>void)=>{
    Connector.getInstance().getData(args).then(
      (value: any)=>{
        resolve(value)
      },
      (error: string)=>{
        reject(error)
      }
    )
  })
})

app.on('window-all-closed', () => {
  if(Connector.getInstance()!=null){
    Connector.getInstance().end()
  }
  if (process.platform !== 'darwin') {
    app.quit() 
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})