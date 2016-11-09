"use strict";
var MM = require("./app/module");
var button = document.createElement("button");
var button2 = document.createElement("button");
button.textContent = "Connect";
button2.textContent = "GetConnections";
button.addEventListener('click', function () {
    MM.MainModule.AddConnection("localhost", 27017);
}, false);
button2.addEventListener('click', function () {
    var connections = MM.MainModule.GetConnections();
    if (connections !== null)
        if (connections.length > 0)
            for (var i = 0; i < connections.length; i++) {
                var ele = document.createElement("div");
                ele.textContent = connections[i];
                document.body.appendChild(ele);
            }
}, false);
document.body.appendChild(button);
document.body.appendChild(button2);
//# sourceMappingURL=index.js.map