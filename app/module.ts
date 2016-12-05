const S = require("../win/__sss")
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
    export function GetCollecionDocuments(ConnectionName: string,DataBaseName:string, CollectionName: string, callback: any) {
            GetCollecionNames(ConnectionName,DataBaseName,(collec: Array<string>) => {
                if (collec!==null){
                    var indexof:number=collec.indexOf(CollectionName);
                    if (indexof > -1){
                        var server:string=ConnectionName.split(S.Join)[0];
                        var port:number=Number(ConnectionName.split(S.Join)[1]);
                        var user:string=ConnectionName.split(S.Join)[2];
                        var client:domain.MgoClient=new domain.MgoClient(server,port,user);
                        var db:domain.MgoDb=new domain.MgoDb(client,DataBaseName)
                        var collection:domain.MgoCollection=new domain.MgoCollection(db,CollectionName);
                        if (collection!==null){
                            collection.ListDocuments((documents:Array<any>) => {
                                var a=documents;
                                callback(documents);

                            });
                        }

                    }
                }
                
                


            });

            


    }


}



