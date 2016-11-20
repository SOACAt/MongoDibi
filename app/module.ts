import MgoClient = require("./domain")
import App = require("./app")


export module MainModule {
    let app: App = new App();

    export function AddConnection(server: string, port: number, user?: string): string {

        var mc = new MgoClient(server, port, user);
        app.AddConnection(mc);
        return mc.GetName();

    }
    export function GetConnectionsNames(): Array<string> {

        return app.GetConnectionsNames();
    }

    export function GetDatabaseNames(ConnectionName: string, callback: any) {

        var ret: Array<string> = app.GetConnection(ConnectionName).Databases;
        if (ret === null) {
            app.LoadDatabases(ConnectionName, (dbs: Array<string>) => {
                callback(dbs);
            })
        } else {
            callback(ret);
        }
        
    }
}



