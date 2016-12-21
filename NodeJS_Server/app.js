console.log("it works !!!");


var http = require("http");
var express = require("express");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var path = require("path");
//var defaultRoute = require("./app/routes/default.route.js");

var deviceRoute  = require("./app/routes/device.router.js");

//var DAO_Connection = require()


var app = express();
//app.use(defaultRoute); 
app.use(deviceRoute);
app.use("/", express.static(path.join(__dirname, "public/login")));
//init server
var server = http.createServer(app);
server.listen(CONFIG.port);


