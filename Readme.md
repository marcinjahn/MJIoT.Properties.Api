# MJIoT Properties API
This project is a Web API for clients to get:
- last value of chosen property - call with <url>/api/{deviceId}/{propertyName}
- values (with timestamps) of chosen properties in a specified timeframe. - call with <url>/api/{deviceId}/{propertyName}?startTime={startTime}$endTime={endTime}

API supports JWT token authentication and allows access only if token is signed by MJIoT certificate.

## Technologies
Node.JS

## Dependencies (Node packages)
xxpress (API framework)
express-bearer-token (middleware function to ease access to the token)
jsonwebtoken (JWT tokens utility)
documentdb (CosmosDB SDK)
dotenv (storing credentials)