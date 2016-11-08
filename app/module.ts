import MgoClient = require("./domain")
import App = require("./app")


export module MainModule {
    let app: App = null;

    export function AddConnection(server: string, port: number, user?: string, pwd?: string) {
        if (app === null) {
            app = new App();
        }
        var mc = new MgoClient(server, port, user, pwd);
        app.AddConnection(mc);
        
        alert("Ok");

    }
}



