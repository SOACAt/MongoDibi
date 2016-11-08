"use strict";
var MgoClient = require("./domain");
var App = require("./app");
var MainModule;
(function (MainModule) {
    var app = null;
    function AddConnection(server, port, user, pwd) {
        if (app === null) {
            app = new App();
        }
        var mc = new MgoClient(server, port, user, pwd);
        app.AddConnection(mc);
        alert("Ok");
    }
    MainModule.AddConnection = AddConnection;
})(MainModule = exports.MainModule || (exports.MainModule = {}));
//# sourceMappingURL=module.js.map