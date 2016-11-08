import MgoClient = require("./domain")


class App{
    __mongoClient:MgoClient;
  
    AddConnection(mongoClient: MgoClient){
        this.__mongoClient=mongoClient;
    };
}

export = App;