"use strict";
var MgoClient = require("./domain");
var App = require("./app");
var MainModule;
(function (MainModule) {
    var app = new App();
    function AddConnection(server, port, user, pwd) {
        var mc = new MgoClient(server, port, user, pwd);
        app.AddConnection(mc);
        alert("Ok");
    }
    MainModule.AddConnection = AddConnection;
    function GetConnections() {
        return app.GetConnections();
    }
    MainModule.GetConnections = GetConnections;
})(MainModule = exports.MainModule || (exports.MainModule = {}));
//# sourceMappingURL=module.js.map