"use strict";
var mongodb = require('mongodb');
var ipcRenderer = require('electron').ipcRenderer;
var remote = require('electron').remote;
var S = require("./__sss");
ipcRenderer.on(S.Win_connection_add_save_reply, function (event, arg) {
    alert('reply');
    ModalShow(false, '');
    var window = remote.getCurrentWindow();
    window.close();
});
document.getElementById("btnSave").addEventListener("click", function () {
    var server = document.getElementById("Server");
    var port = document.getElementById("Port");
    var username = document.getElementById("Username");
    var password = document.getElementById("Password");
    var msg = server.value + '#' + port.value + '#' + username.value + '#' + password.value;
    ipcRenderer.send(S.Win_connection_add_save, msg);
});
document.getElementById("btnCancel").addEventListener("click", function () {
    ModalShow(false, '');
});
document.getElementById("btnTest").addEventListener("click", function () {
    ShowResult('', true);
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
        ModalShow(true, resultat);
    }
}
;
function ModalShow(yes, text) {
    var modal = document.getElementById('myModal');
    if (yes) {
        var modalText = document.getElementById("modalText");
        modalText.innerText = text;
        modal.style.display = "block";
    }
    else {
        modal.style.display = "none";
    }
}
//# sourceMappingURL=connection_add.js.map