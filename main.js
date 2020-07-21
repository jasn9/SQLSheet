
const electron = require('electron')
const dbHandler = require('./dbHandler')
const { BrowserWindow, app, ipcMain } = require('electron')

let mainWindow;

function createWindow(){

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.webContents.openDevTools({mode: 'bottom'});

    mainWindow.loadFile('index.html')
}

electron.app.whenReady().then(createWindow)

electron.app.on('window-all-closed', ()=>{
    if(process.platform !== 'DARWIN'){
        app.quit()
    }
})

electron.app.on('active', ()=>{
    if(BrowserWindow.getAllWindows() === 0){
        createWindow()
    }
})


ipcMain.on('db-credentails', (event, args)=>{
    console.log(args)
    var con = dbHandler.getMysqlConnection(args)
    con.connect((err)=>{
        var res = {
            "error": false,
            "reason": null
        }
        if(err){
            res.error = true
            res.reason = err
        }
        event.returnValue = res
    })
})

ipcMain.on('showDatabase', (event,args)=>{
    mainWindow.loadFile('display-sql.html')
    event.returnValue = 'ok!!'
})

ipcMain.on('GetDatabases', (event, args)=>{
    console.log('hello')
    dbHandler.getDatabases((error, data)=>{
        var res = {
            "success" : true,
            "payload" : data,
            "error" : false,
            "reason" : error
        } 
        event.returnValue = res;
    })
})

ipcMain.on('FetchTables', (event, args)=>{
    dbHandler.getTables(args, (error, data)=>{
        var res = {
            "success" : true,
            "payload" : data,
            "error" : false,
            "reason" : error
        } 
        event.returnValue = res;
    })
})