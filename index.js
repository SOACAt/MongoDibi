"use strict";
var MM = require("./app/module");
var button = document.createElement("button");
button.textContent = "Connect";
button.addEventListener('click', function () {
    MM.MainModule.AddConnection("localhost", 27017);
}, false);
document.body.appendChild(button);
//# sourceMappingURL=index.js.map