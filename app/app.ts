import MgoClient = require("./domain")


class MgoConnections {
    private __name: string;
    private __mongoClient: MgoClient;
    private __databases: Array<string>;

    get Name():string{
        return this.__name;
    }
    get Databases():Array<string>{
        return this.__databases;

    }
    get Client():MgoClient{
        return this.__mongoClient;
    }
    constructor(mongoClient: MgoClient) {
        this.__mongoClient = mongoClient;
        this.__name = mongoClient.GetName();
        this.__databases = mongoClient.ListDatabases();
    }
}

class App {
    private __mgoConnections: Array<MgoConnections> = null;

    GetConnections(): Array<string> {
        var ret: Array<string> = null;

        if (this.__mgoConnections.length > 0) {
            ret=new Array<string>();
            for (var i=0;i<this.__mgoConnections.length;i++)
                ret.push(this.__mgoConnections[i].Name);
            
        }



        return ret;
    }
    AddConnection(mongoClient: MgoClient) {
        if (this.__mgoConnections === null) this.__mgoConnections = new Array<MgoConnections>();
        var mgoc = new MgoConnections(mongoClient);
        this.__mgoConnections.push(mgoc);
    };
}

export = App;