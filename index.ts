const {ipcRenderer} = require('electron')

const S = require("./win/__sss")

import VW = require('./app/view');
import MM = require("./app/module");


VW.ViewModule.CreateBody();
VW.ViewModule.AddHeaderMenuIconButton("icon-leaf", () => {
    ipcRenderer.sendSync(S.Win_connection_add_msg, '');
});
VW.ViewModule.AddHeaderMenuIconButton("icon-shuffle", () => { alert('shuffle') });

ipcRenderer.on(S.Win_main_add_server, (event: any, arg: any) => {
    var _args: string[] = arg.split(S.Split);
    if (_args.length > 0) {

        var _itemId: string = MM.MainModule.AddConnection(_args[0], Number(_args[1]), _args[2]);
        if ((_itemId !== null) && (_itemId !== '')) {
            var _title: string = _args[0];
            var _subtitle: string = "port: " + _args[1];
            if (_args[2] !== '') _subtitle += " user: " + _args[2];
            VW.ViewModule.AddNavServerItem("icon-leaf", _itemId, _title, _subtitle);
            MM.MainModule.GetDatabaseNames(_itemId, (dbs: Array<string>) => {
                if (dbs.length > 0) {
                    for (var db of dbs) {
                        VW.ViewModule.AddNavServerItemDb("icon-database", _itemId, db, (event: any) => {
                            var serverId:string=event.currentTarget.parentElement.id.split(S.JoinDb)[0];
                            var localdb:string=event.currentTarget.parentElement.id.split(S.JoinDb)[1];
                            MM.MainModule.GetCollecionNames(serverId, localdb, (collec: Array<string>) => {
                                VW.ViewModule.AddNavServerItemDbCollection("icon-docs", serverId, localdb, collec,(event: any) => {
                                    var sId=event.currentTarget.parentElement.id.split(S.JoinDb)[0];
                                    var dbId=event.currentTarget.parentElement.id.split(S.JoinDb)[1].split(S.JoinCollection)[0];
                                    var colId=event.currentTarget.parentElement.id.split(S.JoinDb)[1].split(S.JoinCollection)[1];
                                        MM.MainModule.GetCollecionDocuments(sId,dbId,colId,(docs: Array<any>) => {
                                            alert(docs.length);
                                            var myJsonString = JSON.stringify(docs);
                                        });
                                    
                                });
                            });
                        });


                    }
                }

                
            });

        }


    }


});






/*var button=document.createElement("button");
var button2=document.createElement("button");

button.textContent="Connect";
button2.textContent="GetConnections";

button.addEventListener('click', ()=>{
    MM.MainModule.AddConnection("localhost",27017);
}, false);
button2.addEventListener('click', ()=>{
    var connections:Array<string>=MM.MainModule.GetConnections();
    if (connections!==null)
    if (connections.length>0)
        for(var i=0;i<connections.length;i++){
            var ele=document.createElement("div");
            ele.textContent=connections[i];
            document.body.appendChild(ele);
        }
            


}, false);

document.body.appendChild(button);
document.body.appendChild(button2);*/