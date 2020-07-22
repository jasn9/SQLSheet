const $ = require('jquery')
const { ipcRenderer } = require('electron')

$(document).ready(()=>{
    var res = ipcRenderer.sendSync('GetDatabases')
    if(res['success']){
        let databases = res['payload']
        for(let database of databases){
            $('#databases').append(
            `<div><button type="button" style="text-align:left;overflow-wrap: break-word;" class="btn btn-dark btn-block database" name=`+database['Database']+` id=`+database['Database']+ `>` + database['Database']+`</button></div>`)
        }
    }
    $('.database').click(function(event){
        let database = event.currentTarget.name
        var res = ipcRenderer.sendSync('FetchTables', database)
        let tables = res['payload']
        $('#tables').html('')
        for(let table of tables){
            $('#tables').append(
                `<div><button type="button" style="text-align:left;overflow-wrap: break-word;" class="btn btn-secondary btn-block dbtable" name=`+table['Tables_in_'+database]+` id=`+table['Tables_in_'+database]+ `>` + table['Tables_in_'+database]+`</button></div>`)
        }
        $('.dbtable').click(function(event){
            let table = event.currentTarget.name
            var cres = ipcRenderer.sendSync('FetchSchema', table)
            $('#table-schema').text('')
            for(let col of cres['payload']){
                $('#table-schema').append(`<th scope="col">`+col['Field']+`</th>`)
            }
            var rres = ipcRenderer.sendSync('FetchData', table);
            $('#table-data').text('')
            for(let row of rres['payload']){
                let row_tag = `<tr>`
                for(let col of cres['payload']){
                    row_tag+=`<td scope="row">`+row[col['Field']]+`</td>`;
                }
                row_tag += `</tr>`
                $('#table-data').append(row_tag)
            }
        })
    })
});
