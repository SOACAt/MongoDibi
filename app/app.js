"use strict";
var App = (function () {
    function App() {
    }
    App.prototype.AddConnection = function (mongoClient) {
        this.__mongoClient = mongoClient;
    };
    ;
    return App;
}());
module.exports = App;
//# sourceMappingURL=app.js.map