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
    var _args = arg.split(S.Split);
    if (_args.length > 0) {
        var _itemId = _args[0] + S.Join + _args[1] + S.Join + _args[2];
        var _title = _args[0];
        var _subtitle = "port: " + _args[1];
        if (_args[2] !== '')
            _subtitle += " user: " + _args[2];
        VW.ViewModule.AddNavServerItem("icon-database", _itemId, _title, _subtitle, function () {
            VW.ViewModule.AddTabItem(_itemId, _title);
        });
    }
});
//# sourceMappingURL=index.js.map