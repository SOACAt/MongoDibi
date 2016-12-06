"use strict";
var ipcRenderer = require('electron').ipcRenderer;
var S = require("./win/__sss");
var VW = require('./app/view');
var MM = require("./app/module");
VW.ViewModule.CreateBody();
VW.ViewModule.AddHeaderMenuIconButton("icon-leaf", function () {
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
            VW.ViewModule.AddNavServerItem("icon-leaf", _itemId, _title, _subtitle);
            MM.MainModule.GetDatabaseNames(_itemId, function (dbs) {
                if (dbs.length > 0) {
                    for (var _i = 0, dbs_1 = dbs; _i < dbs_1.length; _i++) {
                        var db = dbs_1[_i];
                        VW.ViewModule.AddNavServerItemDb("icon-database", _itemId, db, function (event) {
                            var serverId = event.currentTarget.parentElement.id.split(S.JoinDb)[0];
                            var localdb = event.currentTarget.parentElement.id.split(S.JoinDb)[1];
                            MM.MainModule.GetCollecionNames(serverId, localdb, function (collec) {
                                VW.ViewModule.AddNavServerItemDbCollection("icon-docs", serverId, localdb, collec, function (event) {
                                    var sId = event.currentTarget.parentElement.id.split(S.JoinDb)[0];
                                    var dbId = event.currentTarget.parentElement.id.split(S.JoinDb)[1].split(S.JoinCollection)[0];
                                    var colId = event.currentTarget.parentElement.id.split(S.JoinDb)[1].split(S.JoinCollection)[1];
                                    MM.MainModule.GetCollecionDocuments(sId, dbId, colId, function (docs) {
                                        var id = sId + S.JoinDb + dbId + S.JoinCollection + colId;
                                        VW.ViewModule.AddDocuments(id, docs);
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
//# sourceMappingURL=index.js.map