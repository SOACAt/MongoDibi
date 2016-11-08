"use strict";
var MgoConnections = (function () {
    function MgoConnections(mongoClient) {
        this.__mongoClient = mongoClient;
        this.__name = mongoClient.GetName();
        this.__databases = mongoClient.ListDatabases();
    }
    Object.defineProperty(MgoConnections.prototype, "Name", {
        get: function () {
            return this.__name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoConnections.prototype, "Databases", {
        get: function () {
            return this.__databases;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MgoConnections.prototype, "Client", {
        get: function () {
            return this.__mongoClient;
        },
        enumerable: true,
        configurable: true
    });
    return MgoConnections;
}());
var App = (function () {
    function App() {
        this.__mgoConnections = null;
    }
    App.prototype.GetConnections = function () {
        var ret = null;
        if (this.__mgoConnections.length > 0) {
            ret = new Array();
            this.__mgoConnections.forEach(function (element, index, array) {
                ret.push(element.Name);
            });
        }
        return ret;
    };
    App.prototype.AddConnection = function (mongoClient) {
        if (this.__mgoConnections === null)
            this.__mgoConnections = new Array();
        var mgoc = new MgoConnections(mongoClient);
        this.__mgoConnections.push(mgoc);
    };
    ;
    return App;
}());
module.exports = App;
//# sourceMappingURL=app.js.map