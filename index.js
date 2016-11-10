"use strict";
var ipcRenderer = require('electron').ipcRenderer;
var S = require("./win/__sss");
var VW = require('./app/view');
VW.ViewModule.CreateBody();
VW.ViewModule.AddHeaderMenuIconButton("icon-database", function () {
    ipcRenderer.sendSync(S.Win_connection_add, 'ping');
});
VW.ViewModule.AddHeaderMenuIconButton("icon-shuffle", function () { alert('shuffle'); });
//# sourceMappingURL=index.js.map