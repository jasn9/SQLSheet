const  $  = require('jquery')
const { ipcRenderer } = require('electron')

$(document).ready(()=>{
    $("#form").submit((event)=>{
        event.preventDefault()
        var val = ipcRenderer.sendSync('db-credentails', {
            host: $("#host").val(),
            port: $("#port").val(),
            user: $("#user").val(),
            password: $("#password").val(),
            database: $("#database").val()
        })
        if(val['error']){
            $('#res').removeClass('text-success')
            $('#res').addClass('text-danger')
            $('#res').html("Wrong Credentail, Please Try Again!!")
        }else{
            ipcRenderer.sendSync('showDatabase', true)
        }
    });
});