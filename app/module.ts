import MgoClient = require("./domain")
import App = require("./app")


export module MainModule {
    let app: App = new App();

    export function AddConnection(server: string, port: number, user?: string, pwd?: string) {

        var mc = new MgoClient(server, port, user, pwd);
        app.AddConnection(mc);

        alert("Ok");

    }
    export function GetConnections(): Array<string> {
    
        return app.GetConnections();
    }
}



