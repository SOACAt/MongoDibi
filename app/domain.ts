import mongodb = require('mongodb');
//import Sem = require("../ext/async");
import S = require('../win/__sss');
export class MgoDb {
    private _name: string = '';
    private _collections: Array<string> = null;

    constructor(name: string) {
        this._name = name;
        this._collections = new Array<string>();
    }
    get Name(): string {
        return this._name;
    }
    get Collection(): Array<string> {
        return this._collections;
    }
    ListCollections(db: mongodb.Db, callback: any) {
        db.collections(function (err, collections) {
            var ret:Array<string>=new Array<string>();
            if (collections!=null){
                for (var c of collections) {
                    ret.push(c.collectionName);
                }
            }
            
            callback(ret);
        }
        );
    }
}

export class MgoClient {
    private _server: string = '';
    private _port: number = 0;
    private _user: string = '';
    private _pwd: string = '';



    constructor(server: string, port: number, user?: string) {
        this._server = server;
        this._port = port;
        this._user = user;

    }
    get Server(): string {
        return this._server;
    }
    get Port(): number {
        return this._port;
    }
    get User(): string {
        return this._user;
    }
    set Password(value: string) {
        this._pwd;
    }


    GetName(): string {
        return (this._server + S.Join + this._port + S.Join + this._user).toString();
    }


    ListDatabases(callback: any) {
        var ret: Array<string> = null;
        var MongoClient = new mongodb.MongoClient();
        // Connection url
        var url = 'mongodb://' + this._server + ':' + this._port + '/local';

        // Connect using MongoClient
        MongoClient.connect(url, function (err, db) {

            if (err === null) {
                // Use the admin database for the operation
                var adminDb = db.admin();
                // List all the available databases
                adminDb.listDatabases(function (err, dbs) {
                    if (err === null) {
                        var l = dbs.databases.length;
                        if (l > 0) {
                            ret = new Array<string>();
                            for (var i = 0; i < l; i++) {
                                var tdb = db.db(dbs.databases[i].name);
                                var mgoDb:MgoDb = new MgoDb(dbs.databases[i].name);
                                mgoDb.ListCollections(tdb,(col: Array<string>) => {
                                    
                                    for (var c of col){
                                        mgoDb.Collection.push(c)
                                    }
                                    ret.push(mgoDb.Name);
                                });
                            }
                        }
                    }
                    db.close();
                    callback(ret);
                });
            }

        });

    }
   
};
