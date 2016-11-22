"use strict";
var domain = require("./domain");
var App = require("./app");
var MainModule;
(function (MainModule) {
    var app = new App();
    function AddConnection(server, port, user) {
        var mc = new domain.MgoClient(server, port, user);
        app.AddConnection(mc);
        return mc.GetName();
    }
    MainModule.AddConnection = AddConnection;
    function GetConnectionsNames() {
        return app.GetConnectionsNames();
    }
    MainModule.GetConnectionsNames = GetConnectionsNames;
    function GetDatabaseNames(ConnectionName, callback) {
        var ret = app.GetConnection(ConnectionName).Databases;
        if (ret === null) {
            app.LoadDatabases(ConnectionName, function (dbs) {
                callback(dbs);
            });
        }
        else {
            callback(ret);
        }
    }
    MainModule.GetDatabaseNames = GetDatabaseNames;
})(MainModule = exports.MainModule || (exports.MainModule = {}));
//# sourceMappingURL=module.js.map