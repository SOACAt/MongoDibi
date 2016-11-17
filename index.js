"use strict";
var ipcRenderer = require('electron').ipcRenderer;
var S = require("./win/__sss");
var VW = require('./app/view');
var MM = require("./app/module");
VW.ViewModule.CreateBody();
VW.ViewModule.AddHeaderMenuIconButton("icon-database", function () {
    ipcRenderer.sendSync(S.Win_connection_add_msg, '');
});
VW.ViewModule.AddHeaderMenuIconButton("icon-shuffle", function () { alert('shuffle'); });
ipcRenderer.on(S.Win_main_add_server, function (event, arg) {
    var _args = arg.split(S.Split);
    if (_args.length > 0) {
        var _itemId = MM.MainModule.AddConnection(_args[0], Number(_args[1]), _args[2]);
        if ((_itemId !== null) && (_itemId !== '')) {
            var _title = _args[0];
            var _subtitle = "port: " + _args[1];
            if (_args[2] !== '')
                _subtitle += " user: " + _args[2];
            VW.ViewModule.AddNavServerItem("icon-database", _itemId, _title, _subtitle, function () {
                var navItems = MM.MainModule.GetDatabaseNames(_itemId);
                VW.ViewModule.AddTabItem(_itemId, _title, navItems);
            });
        }
    }
});
//# sourceMappingURL=index.js.map