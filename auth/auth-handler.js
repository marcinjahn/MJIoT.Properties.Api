const fs = require('fs');
const jwt = require('jsonwebtoken');


class AuthHandler {
    constructor() {
        this.userId = null;
    }

    verifyToken(token) {
        let cert = fs.readFileSync('./assets/cert.pem');
        let self = this;
        return new Promise (function(resolve, reject) {
            jwt.verify(token, cert, { algorithms: ['RS256'], ignoreExpiration: true }, function(err, decoded) {
                if (decoded !== undefined) {
                    self.userId = decoded.sub;
                    resolve(true);
                }
                else
                    resolve(false);
              });
        });
    }

    getUserId() {
        return this.userId;
    }
}


module.exports = AuthHandler;