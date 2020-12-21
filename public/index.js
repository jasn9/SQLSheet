import { ipcRenderer } from 'electron';
import { Constants } from './constants';
var form = document.querySelector('#accessForm');
var inputHost = document.querySelector('#host');
var inputUser = document.querySelector('#user');
var inputPassword = document.querySelector('#password');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var databaseCredential = {
        host: inputHost.value,
        user: inputUser.value,
        password: inputPassword.value
    };
    console.log(databaseCredential);
    ipcRenderer.invoke(Constants.DATABASE_CONNECTION_REQUEST, databaseCredential);
});
