import domain = require("./domain")
import App = require("./app")


export module MainModule {
    let app: App = new App();

    export function AddConnection(server: string, port: number, user?: string): string {

        var mc = new domain.MgoClient(server, port, user);
        app.AddConnection(mc);
        return mc.GetName();

    }
    export function GetConnectionsNames(): Array<string> {

        return app.GetConnectionsNames();
    }

    export function GetDatabaseNames(ConnectionName: string, callback: any) {

        var ret: Array<domain.MgoDb> = app.GetConnection(ConnectionName).Databases;
        if (ret === null) {
            app.LoadDatabases(ConnectionName, (dbs: Array<domain.MgoDb>) => {
                app.GetConnection(ConnectionName).Databases=dbs;
                var _back:Array<string>=new Array<string>();
                if (dbs.length>0){
                    for (var db of dbs){
                        _back.push(db.Name);
                    }
                    
                }
                callback(_back);
            })
        } else {
            callback(ret);
        }
        
    }
    export function GetCollecionNames(ConnectionName: string,DataBaseName:string, callback: any) {
        var dbs: Array<domain.MgoDb> = app.GetConnection(ConnectionName).Databases;
        if(dbs!==null){
            //Busquem la db
            var _db:domain.MgoDb=null;
            for (var db of dbs){
                if (db.Name===DataBaseName){
                    _db=db;
                }
            }
            if (_db!==null){
                _db.ListCollections((collections:Array<string>)=>{
                    callback(collections);
                });
            }



        }
    }
}



