"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var createWindow = function () {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('./public/index.html');
};
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
