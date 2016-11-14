import mongodb = require('mongodb');
const {ipcRenderer} = require('electron')
const remote = require('electron').remote;

const S: any = require("./__sss")

ipcRenderer.on(S.Win_connection_add_save_reply, (event: any, arg: any) => {
    alert('reply');
    ModalShow(false, '');
    var window = remote.getCurrentWindow();
    window.close();
});


document.getElementById("btnSave").addEventListener("click",
    () => {
        var server: any = document.getElementById("Server");
        var port: any = document.getElementById("Port");
        var username: any = document.getElementById("Username");
        var password: any = document.getElementById("Password");

        var msg = server.value + '#' + port.value + '#' + username.value + '#' + password.value;

        ipcRenderer.send(S.Win_connection_add_save, msg);



    });
document.getElementById("btnCancel").addEventListener("click",
    () => {

        ModalShow(false, '');
    });
document.getElementById("btnTest").addEventListener("click",
    () => {

        ShowResult('', true);
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
        ModalShow(true, resultat);
    }


};

function ModalShow(yes: boolean, text: string) {
    var modal: any = document.getElementById('myModal');
    if (yes) {
        var modalText: any = document.getElementById("modalText")
        modalText.innerText = text;

        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }

}