const {ipcRenderer} = require('electron')

const S = require("./win/__sss")

import VW = require('./app/view');
import MM = require("./app/module");


VW.ViewModule.CreateBody();
VW.ViewModule.AddHeaderMenuIconButton("icon-database", () => {
    ipcRenderer.sendSync(S.Win_connection_add_msg, '');
});
VW.ViewModule.AddHeaderMenuIconButton("icon-shuffle", () => { alert('shuffle') });

ipcRenderer.on(S.Win_main_add_server, (event: any, arg: any) => {
    var _args: string[] = arg.split(S.Split);
    if (_args.length > 0) {
        var _itemId: string = _args[0] + S.Join + _args[1] + S.Join + _args[2];
        var _title: string = _args[0];
        var _subtitle: string = "port: " + _args[1];
        if (_args[2]!=='') _subtitle +=  " user: " + _args[2];
        VW.ViewModule.AddNavServerItem("icon-database", _itemId, _title, _subtitle, () => {
            VW.ViewModule.AddTabItem(_itemId,_title);
        });
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