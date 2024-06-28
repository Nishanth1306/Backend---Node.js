const http = require("http");
const app = require("./app");
const {port} = require("./config/kyes");


const server = http.createServer(app);



server.listen(port, () => 
    console.log(`Server is Running in port ${port}`));

