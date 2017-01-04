console.log("it works !!!");


var http = require("http");
var express = require("express");
var bodyParser = require('body-parser')

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var path = require("path");
//var defaultRoute = require("./app/routes/default.route.js");

var deviceRoute  = require("./app/routes/device.router.js");
var managerRoute  = require("./app/routes/manager.router.js");



var app = express();
app.use(bodyParser.json());
//app.use(defaultRoute); 
app.use(deviceRoute);
app.use(managerRoute);
app.use("/", express.static(path.join(__dirname, "public/login")));
//init server
var server = http.createServer(app);
server.listen(CONFIG.port);


