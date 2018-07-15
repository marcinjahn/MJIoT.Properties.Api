const express = require('express');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
const PropertiesStorage = require('./db/properties-storage');


class RequestHandler {
    constructor() {
        this.app = express();
        this.portNumber = 3000;
        this.setup();
    }

    async init() {
        let docDbClient = new DocumentDBClient(config.host, {
            masterKey: config.authKey
        });
        this.storage = new PropertiesStorage(docDbClient, config.databaseId, config.collectionId);
        await this.storage.init();
    }

    setPort(portNumber) {
        this.portNumber = portNumber;
    }

    start() {
        this.app.listen(this.portNumber, () => console.log("Listening on port 3000..."))
    }

    setup() {
        this.app.get("/api/:deviceId/:propertyName", async (req, res) => {
            let deviceId = req.params.deviceId;
            let propertyName = req.params.propertyName;

            let data = await this.storage.getLastValue(deviceId, propertyName);

            res.send(data);
            // res.send(`You requested ${deviceId} and ${propertyName}`);

            // res.status(404).send("Requested data is not available.");
        });
    }

}

module.exports = RequestHandler;