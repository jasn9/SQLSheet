"use strict";
var form = document.querySelector('#accessForm');
var inputHost = document.querySelector('#host');
var inputUser = document.querySelector('#user');
var inputPassword = document.querySelector('#password');
console.log(form);
console.log(inputHost);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var databaseCredential = {
        host: inputHost.value,
        user: inputUser.value,
        password: inputPassword.value
    };
    console.log(databaseCredential);
});
