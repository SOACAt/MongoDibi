"use strict";
var ipcRenderer = require('electron').ipcRenderer;
var S = require("./win/__sss");
var VW = require('./app/view');
VW.ViewModule.CreateBody();
VW.ViewModule.AddHeaderMenuIconButton("icon-database", function () {
    ipcRenderer.sendSync(S.Win_connection_add_msg, '');
});
VW.ViewModule.AddHeaderMenuIconButton("icon-shuffle", function () { alert('shuffle'); });
ipcRenderer.on(S.Win_main_add_server, function (event, arg) {
    var _args = arg.split('#');
    if (_args.length > 0) {
        alert('kk');
        alert(_args[0]);
    }
});
//# sourceMappingURL=index.js.map