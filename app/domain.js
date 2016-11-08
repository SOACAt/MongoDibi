"use strict";
var mongodb = require('mongodb');
var MgoClient = (function () {
    function MgoClient(server, port, user, pwd) {
        this._server = '';
        this._port = 0;
        this._user = '';
        this._pwd = '';
        this._server = server;
        this._port = port;
        this._user = user;
        this._pwd = pwd;
    }
    MgoClient.prototype.ListDatabases = function () {
        var MongoClient = new mongodb.MongoClient();
        var url = 'mongodb://localhost:27017/test';
        MongoClient.connect(url, function (err, db) {
            var adminDb = db.admin();
            adminDb.listDatabases(function (err, dbs) {
                var l = dbs.databases.length;
                db.close();
            });
        });
    };
    return MgoClient;
}());
;
module.exports = MgoClient;
//# sourceMappingURL=domain.js.map