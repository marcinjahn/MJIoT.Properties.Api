const express = require('express');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
const PropertiesStorage = require('./db/properties-storage');


class RequestHandler {
    constructor() {
        this.app = express();
        this.portNumber = 3000;
        this.setup();

        this.storage = new PropertiesStorage();
    }

    // async init() {

    //     //await this.storage.init();
    // }

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

            let data;
            let startTime = req.query.startTime === undefined ? null : req.query.startTime;
            let endTime = req.query.endTime === undefined ? null : req.query.endTime;
            if (startTime != null || endTime != null)
                data = await this.storage.getValues(deviceId, propertyName, startTime, endTime);
            else 
                data = await this.storage.getLastValue(deviceId, propertyName);

            res.send(data);
            // res.send(`You requested ${deviceId} and ${propertyName}`);

            // res.status(404).send("Requested data is not available.");
        });
    }
}

module.exports = RequestHandler;