import mongodb = require('mongodb');
const {ipcRenderer} = require('electron')
const S = require("./__sss")

document.getElementById("btnSave").addEventListener("click",
    () => {
        var server: any = document.getElementById("Server");
        var port: any = document.getElementById("Port");
        var username: any = document.getElementById("Username");
        var password: any = document.getElementById("Password");

        ipcRenderer.sendSync(S.Win_connection_add_msg, '');
        alert('Save');

    });
document.getElementById("btnCancel").addEventListener("click",
    () => {

        var modal = document.getElementById('myModal');
        modal.style.display = "none";

    });
document.getElementById("btnTest").addEventListener("click",
    () => {
        ShowResult('', false);
        var server: any = document.getElementById("Server");
        var port: any = document.getElementById("Port");
        var username: any = document.getElementById("Username");
        var password: any = document.getElementById("Password");
        var error: boolean = (server.value === '' || port.value === '');

        if (!error) {
            var url = '';

            if (username.value === '') {
                url = 'mongodb://' + server.value + ':' + port.value;
            } else {
                url = 'mongodb://' + username.value + ':' + password.value + '@' + server.value + ':' + port.value;
            }
            var mongoClient = new mongodb.MongoClient();
            mongoClient.connect(url, function (err, mongoClient) {
                if (err === null) {
                    mongoClient.close();
                    ShowResult("Test passed!! Do you want save the connection?", false);
                } else {
                    ShowResult("test NOT passed!!", true);
                }
            });


        } else {
            ShowResult("Something are wrong!!!!!", true);
        }




    });

function ShowResult(resultat: string, error: boolean) {
    var color = "#0000FF"
    if (error === true) {
        color = "#FF0000";
        var _resobj = document.getElementById("Resultat");
        _resobj.style.color = color;
        _resobj.innerText = resultat;
    } else {
        var modalText: any = document.getElementById("modalText")
        modalText.innerText = resultat;
        var modal: any = document.getElementById('myModal');
        modal.style.display = "block";
    }

};