"use strict";
var MgoConnection = (function () {
    function MgoConnection(mongoClient) {
        this.__mongoClient = mongoClient;
        this.__name = mongoClient.GetName();
        this.__databases = mongoClient.ListDatabases();
    }
    Object.defineProperty(MgoConnection.prototype, "Name", {
        get: function () {
            return this.__name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoConnection.prototype, "Databases", {
        get: function () {
            return this.__databases;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoConnection.prototype, "Client", {
        get: function () {
            return this.__mongoClient;
        },
        enumerable: true,
        configurable: true
    });
    return MgoConnection;
}());
var App = (function () {
    function App() {
        this.__mgoConnections = null;
    }
    App.prototype.GetConnections = function () {
        return this.__mgoConnections;
    };
    App.prototype.GetConnectionsNames = function () {
        var ret = new Array();
        if (this.__mgoConnections.length > 0) {
            for (var _i = 0, _a = this.__mgoConnections; _i < _a.length; _i++) {
                var mgoCon = _a[_i];
                ret.push(mgoCon.Name);
            }
        }
        return ret;
    };
    App.prototype.GetConnection = function (connectionName) {
        var ret;
        if (this.__mgoConnections.length > 0) {
            for (var _i = 0, _a = this.__mgoConnections; _i < _a.length; _i++) {
                var mgoCon = _a[_i];
                if (connectionName === mgoCon.Name) {
                    ret = mgoCon;
                }
            }
        }
        return ret;
    };
    App.prototype.AddConnection = function (mongoClient) {
        if (this.__mgoConnections === null)
            this.__mgoConnections = new Array();
        var mgoc = new MgoConnection(mongoClient);
        this.__mgoConnections.push(mgoc);
    };
    ;
    App.prototype.LoadDatabases = function (connectionName, callback) {
        var ret = this.GetConnection(connectionName);
        if (ret !== null) {
            ret.Client.ListDatabases2(function (dbs) {
                if (dbs !== null) {
                    callback(dbs);
                }
            });
        }
    };
    return App;
}());
module.exports = App;
//# sourceMappingURL=app.js.map