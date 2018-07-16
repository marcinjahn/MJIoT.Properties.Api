const express = require('express');
const PropertiesStorage = require('./db/properties-storage');
const AuthHandler = require('./auth/auth-handler');
const bearerToken = require('express-bearer-token');


class Server {
    constructor() {
        this.storage = new PropertiesStorage();
        this.authHandler = new AuthHandler();

        this.app = express();
        this.portNumber = 3000;
        this.setup();
    }

    setPort(portNumber) {
        this.portNumber = portNumber;
    }

    start() {
        this.app.listen(this.portNumber, () => console.log("Listening on port 3000..."))
    }

    setup() {
        //AUTHENTICATION
        this.app.use(bearerToken());
        this.app.use(async (req, res, next) => {
            let isTokenValid = await this.authHandler.verifyToken(req.token);
            if (!isTokenValid)
                res.status(401).send("The request's token is not correct. Request dropped");
            next();
        });

        //GET REQUESTS
        this.app.get("/api/:deviceId/:propertyName", async (req, res) => {
            let deviceId = req.params.deviceId;
            let propertyName = req.params.propertyName;

            let data;
            let startTime = req.query.startTime === undefined ? null : req.query.startTime;
            let endTime = req.query.endTime === undefined ? null : req.query.endTime;
            try {
                if (startTime != null || endTime != null)
                    data = await this.storage.getValues(deviceId, propertyName, startTime, endTime);
                else 
                    data = await this.storage.getLastValue(deviceId, propertyName);

                res.send(data);
            }
            catch(e) {
                res.status(400).send("Request could not be handled.")
            }

            // res.send(`You requested ${deviceId} and ${propertyName}`);

            // res.status(404).send("Requested data is not available.");
        });
    }
}

module.exports = Server;