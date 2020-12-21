import { app, BrowserWindow, ipcMain } from 'electron';
import { Constants } from './constants';
var createWindow = function () {
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('./public/index.html');
};
app.whenReady().then(createWindow);
ipcMain.handle(Constants.DATABASE_CONNECTION_REQUEST, function (e, args) {
    console.log(args);
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
