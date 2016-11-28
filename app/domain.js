"use strict";
var mongodb = require('mongodb');
var S = require('../win/__sss');
var MgoDb = (function () {
    function MgoDb(client, name) {
        this._client = null;
        this._name = '';
        this._collections = null;
        this._client = client;
        this._name = name;
        this._collections = new Array();
    }
    Object.defineProperty(MgoDb.prototype, "Client", {
        get: function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoDb.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoDb.prototype, "Collection", {
        get: function () {
            return this._collections;
        },
        enumerable: true,
        configurable: true
    });
    MgoDb.prototype.ListCollections = function (callback) {
        var url = 'mongodb://' + this._client.Server + ':' + this._client.Port + '/' + this.Name;
        var MongoClient = new mongodb.MongoClient();
        var _safe = this;
        MongoClient.connect(url, function (err, db) {
            if (err === null) {
                db.collections(function (err, collections) {
                    var ret = new Array();
                    if (collections != null) {
                        for (var _i = 0, collections_1 = collections; _i < collections_1.length; _i++) {
                            var c = collections_1[_i];
                            ret.push(c.collectionName);
                        }
                    }
                    db.close();
                    callback(ret);
                });
            }
        });
    };
    return MgoDb;
}());
exports.MgoDb = MgoDb;
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
    MgoClient.prototype.ListDatabases = function (callback) {
        var _safe = this;
        var ret = null;
        var MongoClient = new mongodb.MongoClient();
        var url = 'mongodb://' + this._server + ':' + this._port + '/local';
        MongoClient.connect(url, function (err, db) {
            if (err === null) {
                var adminDb = db.admin();
                adminDb.listDatabases(function (err, dbs) {
                    if (err === null) {
                        var l = dbs.databases.length;
                        if (l > 0) {
                            ret = new Array();
                            for (var i = 0; i < l; i++) {
                                var tdb = db.db(dbs.databases[i].name);
                                var mgoDb = new MgoDb(_safe, dbs.databases[i].name);
                                ret.push(mgoDb);
                            }
                        }
                    }
                    db.close();
                    callback(ret);
                });
            }
        });
    };
    return MgoClient;
}());
exports.MgoClient = MgoClient;
;
//# sourceMappingURL=domain.js.map