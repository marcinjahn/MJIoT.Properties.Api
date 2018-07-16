require('dotenv').config();
const AuthHandler = require('./auth/auth-handler');
const RequestHandler = require('./request-handler');


let authHandler = new AuthHandler();
let id = authHandler.getUserId();
console.log(id);


let requestHandler = new RequestHandler();
// await requestHandler.init();
requestHandler.start();











// async function Main() {
//     let authHandler = new AuthHandler();
//     let id = authHandler.getUserId();
//     console.log(id);
    
    
//     let requestHandler = new RequestHandler();
//     // await requestHandler.init();
//     requestHandler.start();
// }

// Main();

// while(true) {

// }