let DocumentDBClient = require('documentdb').DocumentClient;

class CosmosDbHelper {
    constructor() {
        this.documentDbClient = new DocumentDBClient(process.env.HOST, { masterKey: process.env.AUTH_KEY });
        this.databaseId = process.env.DATABASE_ID;
        this.collectionId = process.env.COLLECTION_ID;
    }

    async init() {
        this.db = await this.getDatabase(this.documentDbClient, this.databaseId, (data) => {console.log("database error: "); console.log(data);});
        this.collection = await this.getCollection(this.documentDbClient, this.db._self, this.collectionId, (data) => {console.log("collection error: "); console.log(data);})
    }

    getDatabase(callback) {
        let querySpec = {
        query: 'SELECT * FROM root r WHERE r.id = @id',
        parameters: [{ name: '@id', value: this.databaseId }]
        };
    

        return new Promise (function(resolve, reject) {
            client.queryDatabases(querySpec).toArray((err, results) => {
                if (err) {
                    reject(err);
                } else {
                    // if (results.length === 0) {
                    // let databaseSpec = { id: databaseId };
                    // client.createDatabase(databaseSpec, (err, created) => {
                    //     callback(null, created);
                    // });
                    // } else {
                    resolve(results[0]);
                    // }
                }
            });
        });

    }
    
    getCollection(client, databaseLink, collectionId, callback) {
        let querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{ name: '@id', value: collectionId }]
        };
    
        client.queryCollections(databaseLink, querySpec).toArray((err, results) => {
        if (err) {
            callback(err);
        } else {
            // if (results.length === 0) {
            // let collectionSpec = { id: collectionId };
            // client.createCollection(databaseLink, collectionSpec, (err, created) => {
            //     callback(null, created);
            // });
            // } else {
            callback(null, results[0]);
            // }
        }
        });
    }

    find(querySpec, callback) {
        let self = this;
    
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
        });
    }
    
    addItem(item, callback) {
        let self = this;
    
        item.date = Date.now();
        item.completed = false;
    
        self.client.createDocument(self.collection._self, item, function(err, doc) {
        if (err) {
            callback(err);
        } else {
            callback(null, doc);
        }
        });
    }
    
    updateItem(itemId, callback) {
        let self = this;
    
        self.getItem(itemId, function(err, doc) {
        if (err) {
            callback(err);
        } else {
            doc.completed = true;
    
            self.client.replaceDocument(doc._self, doc, function(err, replaced) {
            if (err) {
                callback(err);
            } else {
                callback(null, replaced);
            }
            });
        }
        });
    }
    
    getItem(itemId, callback) {
        let self = this;
        let querySpec = {
        query: 'SELECT * FROM root r WHERE r.id = @id',
        parameters: [{ name: '@id', value: itemId }]
        };
    
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results[0]);
        }
        });
    }
}

module.exports = CosmosDbHelper;