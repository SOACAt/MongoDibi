"use strict";
var mongodb = require('mongodb');
document.getElementById("btnSave").addEventListener("click", function () {
    alert('save');
});
document.getElementById("btnTest").addEventListener("click", function () {
    var url = 'mongodb://localhost:27017';
    var mongoClient = new mongodb.MongoClient();
    mongoClient.connect(url, function (err, mongoClient) {
        if (err === null) {
            mongoClient.close();
            ShowResult("test passed!!", false);
        }
        else {
            ShowResult("test NOT passed!!", true);
        }
    });
});
function ShowResult(resultat, error) {
    var color = "#0000FF";
    if (error === true) {
        color = "#FF0000";
    }
    var _resobj = document.getElementById("Resultat");
    _resobj.style.color = color;
    _resobj.innerText = resultat;
}
;
//# sourceMappingURL=connection_add.js.map