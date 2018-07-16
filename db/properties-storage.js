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
        this.helper.deleteDocs();
        let startTimeQuery = "";
        if (this.checkDate(startTime))
            startTimeQuery = `AND c.Timestamp>="${startTime}"`;
        let endTimeQuery = "";
        if (this.checkDate(endTime))
            endTimeQuery = `AND c.Timestamp<="${endTime}"`;   

        let query = `SELECT c.PropertyValue, c.Timestamp FROM c 
        WHERE c.DeviceId=${deviceId} AND c.PropertyName="${propertyName}" ${startTimeQuery} ${endTimeQuery}
        ORDER BY c.Timestamp ASC`;
        console.log(query);
        var result = await this.helper.queryCollection(query);

        return result;
    }

    checkDate(date) {
        if (date == null)
            return false;
        if (Date.parse(date) != NaN)
            return true;
        return false;
    }
}

module.exports = PropertiesStorage;