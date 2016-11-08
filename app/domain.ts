import mongodb = require('mongodb');

class MgoClient {
    _server = '';
    _port = 0;
    _user = '';
    _pwd = '';

    constructor(server: string, port: number, user?: string, pwd?: string) {
        this._server = server;
        this._port = port;
        this._user = user;
        this._pwd = pwd;
    }
    ListDatabases() {

        var MongoClient = new mongodb.MongoClient();
        // Connection url
        var url = 'mongodb://' + this._server + ':' + this._port +'/test';
        // Connect using MongoClient
        MongoClient.connect(url, function (err, db) {
            // Use the admin database for the operation
            var adminDb = db.admin();
            // List all the available databases
            adminDb.listDatabases(function (err, dbs) {
                var l=dbs.databases.length;
                db.close();
            });
        });

    }

};

export = MgoClient;