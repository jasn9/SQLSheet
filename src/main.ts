import { app, BrowserWindow, ipcMain, IpcMain } from 'electron'
import { DatabaseCredential, Connector } from './databaseConnector'
import { Constants  } from './constants'

let createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./public/index.html')
}

app.whenReady().then(createWindow)

ipcMain.handle(Constants.DATABASE_CONNECTION_REQUEST, (e: Electron.IpcMainInvokeEvent, args: DatabaseCredential)=>{
    let res = Connector.CreateConnection(args)
    e.returnValue = res
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit() 
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})