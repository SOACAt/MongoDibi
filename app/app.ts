import domain = require("./domain")

class MgoConnection {
    private __name: string;
    private __mongoClient: domain.MgoClient;
    private __databases: Array<domain.MgoDb>;

    get Name(): string {
        return this.__name;
    }
    get Databases(): Array<domain.MgoDb> {
        return this.__databases;

    }
    set Databases(value:Array<domain.MgoDb>)  {
        this.__databases=value;
    }
    get Client(): domain.MgoClient {
        return this.__mongoClient;
    }
    constructor(mongoClient: domain.MgoClient) {
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
    AddConnection(mongoClient: domain.MgoClient) {
        if (this.__mgoConnections === null) this.__mgoConnections = new Array<MgoConnection>();
        var mgoc = new MgoConnection(mongoClient);
        this.__mgoConnections.push(mgoc);
    };
    LoadDatabases(connectionName: string, callback:any) {
        var ret: MgoConnection = this.GetConnection(connectionName)
        

        if (ret !== null) {
            ret.Client.ListDatabases((dbs: Array<domain.MgoDb>) => {
                if (dbs !== null) {

                    callback(dbs);
                }
            });
        }


    }

}
export = App;
