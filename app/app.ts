import MgoClient = require("./domain")

class MgoConnection {
    private __name: string;
    private __mongoClient: MgoClient;
    private __databases: Array<string>;

    get Name(): string {
        return this.__name;
    }
    get Databases(): Array<string> {
        return this.__databases;

    }
    get Client(): MgoClient {
        return this.__mongoClient;
    }
    constructor(mongoClient: MgoClient) {
        this.__mongoClient = mongoClient;
        this.__name = mongoClient.GetName();
        this.__databases = null;
    }
}


class App {
    private __mgoConnections: Array<MgoConnection> = null;

    GetConnections(): Array<MgoConnection> {
        return this.__mgoConnections;
    }
    GetConnectionsNames(): Array<string> {
        var ret: Array<string> = new Array<string>();

        if (this.__mgoConnections.length > 0) {
            for (let mgoCon of this.__mgoConnections) {
                ret.push(mgoCon.Name);
            }
        }
        return ret;
    }
    GetConnection(connectionName: string): MgoConnection {
        var ret: MgoConnection
        if (this.__mgoConnections.length > 0) {
            for (let mgoCon of this.__mgoConnections) {
                if (connectionName === mgoCon.Name) {
                    ret = mgoCon;
                }
            }
        }

        return ret;
    }
    AddConnection(mongoClient: MgoClient) {
        if (this.__mgoConnections === null) this.__mgoConnections = new Array<MgoConnection>();
        var mgoc = new MgoConnection(mongoClient);
        this.__mgoConnections.push(mgoc);
    };
    LoadDatabases(connectionName: string, callback:any) {
        var ret: MgoConnection = this.GetConnection(connectionName)
        

        if (ret !== null) {
            ret.Client.ListDatabases((dbs: Array<string>) => {
                if (dbs !== null) {

                    callback(dbs);
                }
            });
        }


    }

}
export = App;
