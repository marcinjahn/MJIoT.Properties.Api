var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

class ModelsSqlAccessor {
    constructor() {
        this.config = {
            userName: process.env.MJIOT_MODELSDB_USER,
            password: process.env.MJIOT_MODELSDB_PASS,
            server: process.env.MJIOT_MODELSDB_SERVER,
            options: {
                database: process.env.MJIOT_MODELSDB_DATABASE,
                encrypt: true
            }
        };
        this.init();
    }

    async init() {
        this.connection = new Connection(this.config);
        let conn = this.connection;
        return new Promise(function(resolve, reject) {
            conn.on('connect', function(err) {
                if (err) 
                {
                    console.log(err);
                    reject("Error while connectiong to SQL DB");
                }
                else
                {
                    console.log('SQL connection established');
                    resolve(true);
                }
            });
        });
    }

    async queryDatabase(query) { 
        // Read all rows from table
        let conn = this.connection;
        let result = [];
        return new Promise (function(resolve, reject) {
            let request = new Request(
                query,
                function(err, rowCount, rows) 
                    {
                        if (err)
                            reject(err);
                    }
                );

            request.on('row', function(columns) {
                //resolve(columns);
                let rowData = [];
                columns.forEach(function(column) {
                    rowData.push(column.value)
                });
                result.push(rowData);
            });

            request.on('requestCompleted', function() {
                resolve(result);
            });
            
            conn.execSql(request);
        });
    }
}

module.exports = ModelsSqlAccessor;