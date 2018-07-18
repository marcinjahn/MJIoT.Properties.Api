const CosmosDbAccessor = require("./cosmosdb-accessor");
const escapeString = require('sql-escape-string');


class PropertiesStorage {
    constructor() {
        this.cosmosDbAccessor = new CosmosDbAccessor();
    }

    async getLastValue(deviceId, propertyName) {
        let query = `SELECT TOP 1 c.PropertyValue, c.Timestamp FROM c  
        WHERE c.DeviceId=${deviceId} AND c.PropertyName="${propertyName}"
        ORDER BY c.Timestamp DESC`
        // if (!this.checkQuery(query))
        //     throw "Possible SQL injection, request will not be handled.";
        var result = await this.cosmosDbAccessor.queryCollection(query);

        if (result.length != 0)
            return result[0];
        else
            return null;
    }

    async getValues(deviceId, propertyName, startTime, endTime) {
        let startTimeQuery = "";
        if (this.checkDate(startTime))
            startTimeQuery = `AND c.Timestamp>="${startTime}"`;
        let endTimeQuery = "";
        if (this.checkDate(endTime))
            endTimeQuery = `AND c.Timestamp<="${endTime}"`;   

        let query = `SELECT c.PropertyValue, c.Timestamp FROM c 
        WHERE c.DeviceId=${deviceId} AND c.PropertyName="${propertyName}" ${startTimeQuery} ${endTimeQuery}
        ORDER BY c.Timestamp ASC`;
        // if (!this.checkQuery(query))
        //     throw "Possible SQL injection, request will not be handled.";

        var result = await this.cosmosDbAccessor.queryCollection(query);

        return result;
    }

    checkDate(date) {
        if (date == null)
            return false;
        let result = Date.parse(date);
        if (!isNaN(Date.parse(date)))
            return true;
        return false;
    }

    checkQuery(query) {
        let safeQuery = escapeString(query);
        if (safeQuery != query)
            return false
        return true;
    }
}

module.exports = PropertiesStorage;