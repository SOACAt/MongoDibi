import mongodb = require('mongodb');
//import Sem = require("../ext/async");
import S = require('../win/__sss');
export class MgoCollection {
    private _db: MgoDb = null;
    private _name: string = '';
    private _documents: any;
    constructor(db: MgoDb, name: string) {
        this._db = db;
        this._name = name;

    }
    ListDocuments(callback: any) {
        var url = 'mongodb://' + this._db.Client.Server + ':' + this._db.Client.Port + '/' + this._db.Name;
        var MongoClient = new mongodb.MongoClient();
        var safe=this;
        MongoClient.connect(url, function (err, db) {
            if (err === null) {
                // Create a collection we want to drop later
                var col = db.collection(safe._name);
                // Show that duplicate records got dropped
                col.find({}).limit(50).toArray(function (err, items) {
                   
                    db.close();

                    callback(items);
                });
            }
        });


    }

}


export class MgoDb {
    private _client: MgoClient = null;
    private _name: string = '';
    private _collections: Array<string> = null;

    constructor(client: MgoClient, name: string) {
        this._client = client;
        this._name = name;
        this._collections = new Array<string>();
    }
    get Client(): MgoClient {
        return this._client;
    }
    get Name(): string {
        return this._name;
    }
    get Collection(): Array<string> {
        return this._collections;
    }
    ListCollections(callback: any) {
        var url = 'mongodb://' + this._client.Server + ':' + this._client.Port + '/' + this.Name;
        var MongoClient = new mongodb.MongoClient();
        var _safe: MgoDb = this;
        MongoClient.connect(url, function (err, db) {
            if (err === null) {
                db.collections(function (err, collections) {
                    var ret: Array<string> = new Array<string>();
                    if (collections != null) {
                        for (var c of collections) {
                            ret.push(c.collectionName);
                        }
                    }
                    db.close();
                    callback(ret);
                }
                );
            }
        });


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
        var _safe: MgoClient = this;
        var ret: Array<MgoDb> = null;
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
                            ret = new Array<MgoDb>();
                            for (var i = 0; i < l; i++) {
                                var tdb = db.db(dbs.databases[i].name);
                                var mgoDb: MgoDb = new MgoDb(_safe, dbs.databases[i].name);
                                ret.push(mgoDb);

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
