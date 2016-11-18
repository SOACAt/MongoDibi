"use strict";
var mongodb = require('mongodb');
var Sem = require("../ext/async");
var S = require('../win/__sss');
var MgoClient = (function () {
    function MgoClient(server, port, user) {
        this._server = '';
        this._port = 0;
        this._user = '';
        this._pwd = '';
        this._server = server;
        this._port = port;
        this._user = user;
    }
    Object.defineProperty(MgoClient.prototype, "Server", {
        get: function () {
            return this._server;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoClient.prototype, "Port", {
        get: function () {
            return this._port;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoClient.prototype, "User", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoClient.prototype, "Password", {
        set: function (value) {
            this._pwd;
        },
        enumerable: true,
        configurable: true
    });
    MgoClient.prototype.GetName = function () {
        return (this._server + S.Join + this._port + S.Join + this._user).toString();
    };
    MgoClient.prototype.ListDatabases = function () {
        var ret = null;
        var MongoClient = new mongodb.MongoClient();
        var url = 'mongodb://' + this._server + ':' + this._port + '/Local';
        var sem = new Sem();
        MongoClient.connect(url, function (err, db) {
            if (err === null) {
                var adminDb = db.admin();
                adminDb.listDatabases(function (err, dbs) {
                    if (err === null) {
                        var l = dbs.databases.length;
                        if (l > 0) {
                            ret = new Array();
                            for (var i = 0; i < l; i++) {
                                ret.push(dbs.databases[i].name);
                            }
                        }
                    }
                    db.close();
                });
            }
        });
        return ret;
    };
    MgoClient.prototype.ListDatabases2 = function (callback) {
        var ret = null;
        var MongoClient = new mongodb.MongoClient();
        var url = 'mongodb://' + this._server + ':' + this._port + '/local';
        var sem = new Sem();
        MongoClient.connect(url, function (err, db) {
            if (err === null) {
                var adminDb = db.admin();
                adminDb.listDatabases(function (err, dbs) {
                    if (err === null) {
                        var l = dbs.databases.length;
                        if (l > 0) {
                            ret = new Array();
                            for (var i = 0; i < l; i++) {
                                ret.push(dbs.databases[i].name);
                            }
                        }
                    }
                    db.close();
                    callback(ret);
                });
            }
        });
        return ret;
    };
    return MgoClient;
}());
;
module.exports = MgoClient;
//# sourceMappingURL=domain.js.map