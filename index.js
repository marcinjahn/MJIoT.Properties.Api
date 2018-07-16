require('dotenv').config();

const Server = require('./server');





let server = new Server();
server.start();











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