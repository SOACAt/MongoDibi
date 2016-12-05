"use strict";
var S = require("../win/__sss");
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
                _db.ListCollections(function (collections) {
                    callback(collections);
                });
            }
        }
    }
    MainModule.GetCollecionNames = GetCollecionNames;
    function GetCollecionDocuments(ConnectionName, DataBaseName, CollectionName, callback) {
        GetCollecionNames(ConnectionName, DataBaseName, function (collec) {
            if (collec !== null) {
                var indexof = collec.indexOf(CollectionName);
                if (indexof > -1) {
                    var server = ConnectionName.split(S.Join)[0];
                    var port = Number(ConnectionName.split(S.Join)[1]);
                    var user = ConnectionName.split(S.Join)[2];
                    var client = new domain.MgoClient(server, port, user);
                    var db = new domain.MgoDb(client, DataBaseName);
                    var collection = new domain.MgoCollection(db, CollectionName);
                    if (collection !== null) {
                        collection.ListDocuments(function (documents) {
                            var a = documents;
                            callback(documents);
                        });
                    }
                }
            }
        });
    }
    MainModule.GetCollecionDocuments = GetCollecionDocuments;
})(MainModule = exports.MainModule || (exports.MainModule = {}));
//# sourceMappingURL=module.js.map