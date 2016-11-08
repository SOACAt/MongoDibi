import mongodb = require('mongodb');
import Sem = require("../ext/async");

class MgoClient {
    private _server: string = '';
    private _port: number = 0;
    private _user: string = '';
    private _pwd: string = '';



    constructor(server: string, port: number, user?: string, pwd?: string) {
        this._server = server;
        this._port = port;
        this._user = user;
        this._pwd = pwd;
    }
    get Server():string {
        return this._server;
    }
    get Port():number {
        return this._port;
    }
    get User():string {
        return this._user;
    }

    GetName():string{
        return (this._server+this._port+this._user).toString();
    }
    ListDatabases(): Array<string> {
        var ret: Array<string> = null;
        var MongoClient = new mongodb.MongoClient();
        // Connection url
        var url = 'mongodb://' + this._server + ':' + this._port + '/Local';

        var sem=new Sem();        
        // Connect using MongoClient
        MongoClient.connect(url, function (err, db) {

            if (err === null) {
                // Use the admin database for the operation
                var adminDb = db.admin();
                // List all the available databases
                adminDb.listDatabases(function (err, dbs) {
                    if (err === null) {
                        var l = dbs.databases.length;
                        if(l>0){
                            ret=new Array<string>();
                            for(var i=0;i<l;i++){
                                ret.push(dbs.databases[i].name);
                            }
                        }
                    }
                    db.close();
                    sem.Green();
                });
            }

        });
        sem.Wait();
        return ret;
    }

};

export = MgoClient;