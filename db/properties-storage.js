let CosmosDbHelper = require("./cosmosdb-helper");


class PropertiesStorage {
    constructor() {
        this.helper = new CosmosDbHelper();
        
    }

    async init() {
        await this.helper.init();
    }

    getLastValue(deviceId, propertyName) {
        let querySpec = {
            query: 'SELECT * FROM root r WHERE r.DeviceId=@deviceId',
            parameters: [
                {
                name: '@deviceId',
                value: deviceId
                }
            ]
        };

        return new Promise (function(resolve, reject) {
            this.helper.find(querySpec, function(err, items) {
                if (err) {
                    throw err;
                }
                console.log("DONE");
                console.log(items);
                resolve(items);
            });
        });


    }

    getValues(deviceId, proeprtyName, startTime, endTime) {

    }
}

module.exports = PropertiesStorage;