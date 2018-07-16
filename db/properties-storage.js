let CosmosDbHelper = require("./cosmosdb-helper");


class PropertiesStorage {
    constructor() {
        this.helper = new CosmosDbHelper();
        
    }

    async init() {
        // await this.helper.init();
    }

    async getLastValue(deviceId, propertyName) {
        var result = await this.helper.queryCollection(
            `SELECT TOP 1 c.PropertyValue FROM c  
            WHERE c.DeviceId=${deviceId} AND c.PropertyName="${propertyName}"
            ORDER BY c.Timestamp DESC`);

        if (result.length != 0)
            return result[0].PropertyValue;
        else
            return null;
    }

    async getValues(deviceId, propertyName, startTime, endTime) {
        return await this.helper.queryCollection(
            `SELECT c.PropertyValue, c.Timestamp FROM c 
            WHERE c.DeviceId=${deviceId} AND c.PropertyName="${propertyName}" AND c.PropertyTime>=${startTime} AND c.PropertyTime<=${endTime}
            ORDER BY c.Timestamp ASC`);
    }
}

module.exports = PropertiesStorage;