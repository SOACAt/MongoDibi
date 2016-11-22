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
                app.GetConnection(ConnectionName).Databases = dbs;
                var _back = new Array();
                if (dbs.length > 0) {
                    for (var _i = 0, dbs_1 = dbs; _i < dbs_1.length; _i++) {
                        var db = dbs_1[_i];
                        _back.push(db.Name);
                    }
                }
                callback(_back);
            });
        }
        else {
            callback(ret);
        }
    }
    MainModule.GetDatabaseNames = GetDatabaseNames;
    function GetCollecionNames(ConnectionName, DataBaseName, callback) {
        var dbs = app.GetConnection(ConnectionName).Databases;
        if (dbs !== null) {
            var _db = null;
            for (var _i = 0, dbs_2 = dbs; _i < dbs_2.length; _i++) {
                var db = dbs_2[_i];
                if (db.Name === DataBaseName) {
                    _db = db;
                }
            }
            if (_db !== null) {
                db.ListCollections(function (collections) {
                    callback(collections);
                });
            }
        }
    }
    MainModule.GetCollecionNames = GetCollecionNames;
})(MainModule = exports.MainModule || (exports.MainModule = {}));
//# sourceMappingURL=module.js.map