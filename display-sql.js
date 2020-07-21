const $ = require('jquery')
const { ipcRenderer } = require('electron')

$(document).ready(()=>{
    console.log("hello")
    var res = ipcRenderer.sendSync('GetDatabases')
    console.log(res)
    if(res['success']){
        let databases = res['payload']
        $('#databases').append(`<div class="btn-group-vertical" id="names"></div>`)
        for(let database of databases){
            $('#names').append(
            `<div><button type="button" class="btn btn-dark database" name=`+database['Database']+` id=`+database['Database']+ `onclickDb(this.name)>` + database['Database']+`</button></div>`)
        }
    }
    $('.database').click(function(event){
        let database = event.currentTarget.name
        var res = ipcRenderer.sendSync('FetchTables', database)
        let tables = res['payload']
        $('#tables').text('')
        $('#tables').append(`<div class="btn-group-vertical" id="t-names"></div>`)
        for(let table of tables){
            $('#t-names').append(
                `<div><button type="button" class="btn btn-secondary table" name=`+table['Tables_in_'+database]+` id=`+table['Tables_in_'+database]+ `onclickDb(this.name)>` + table['Tables_in_'+database]+`</button></div>`)
        }
    })
});
