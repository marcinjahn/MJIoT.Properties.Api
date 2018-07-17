const ModelsSqlAccessor = require('./models-sql-accessor');

class ModelsStorage {
    constructor() {
        this.modelsSqlAccessor = new ModelsSqlAccessor();
        // this.modelsSqlAccessor.executeQuery("");
    }

    async getUserIdOfDevice(deviceId) {
        let query = `SELECT User_Id FROM Devices WHERE Id=${deviceId}`;
        let result = await this.modelsSqlAccessor.queryDatabase(query);
        if (result.length == 0 || result[0].length == 0)
            throw "getUserIdOfDevice failed, no data was returned";
        return result[0][0];
    }
}

module.exports = ModelsStorage;