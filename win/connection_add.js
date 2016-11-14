"use strict";
var mongodb = require('mongodb');
document.getElementById("btnSave").addEventListener("click", function () {
    alert('Save');
});
document.getElementById("btnCancel").addEventListener("click", function () {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
});
document.getElementById("btnTest").addEventListener("click", function () {
    ShowResult('', false);
    var server = document.getElementById("Server");
    var port = document.getElementById("Port");
    var username = document.getElementById("Username");
    var password = document.getElementById("Password");
    var error = (server.value === '' || port.value === '');
    if (!error) {
        var url = '';
        if (username.value === '') {
            url = 'mongodb://' + server.value + ':' + port.value;
        }
        else {
            url = 'mongodb://' + username.value + ':' + password.value + '@' + server.value + ':' + port.value;
        }
        var mongoClient = new mongodb.MongoClient();
        mongoClient.connect(url, function (err, mongoClient) {
            if (err === null) {
                mongoClient.close();
                ShowResult("Test passed!! Do you want save the connection?", false);
            }
            else {
                ShowResult("test NOT passed!!", true);
            }
        });
    }
    else {
        ShowResult("Something are wrong!!!!!", true);
    }
});
function ShowResult(resultat, error) {
    var color = "#0000FF";
    if (error === true) {
        color = "#FF0000";
        var _resobj = document.getElementById("Resultat");
        _resobj.style.color = color;
        _resobj.innerText = resultat;
    }
    else {
        var modalText = document.getElementById("modalText");
        modalText.innerText = resultat;
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    }
}
;
//# sourceMappingURL=connection_add.js.map