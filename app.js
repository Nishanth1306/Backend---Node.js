const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");



dotenv.config(); 
const connectMongodb = require('./init/mongodb');

const {authRoute} = require("./routes");
const { errorHandler} = require("./middleware")
const notfound = require("./controllers/notFound");



const app = express();


connectMongodb();





app.use(express.json({limit: "500mb"}));

app.use(bodyParser.urlencoded({limit:"500mb", extended: true}));
app.use(morgan("dev"));


app.use("/api/v1/auth", authRoute)

//error handler
app.use(errorHandler);


//not found route
// app.use("*", notfound);

module.exports = app;
