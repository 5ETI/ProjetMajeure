console.log("it works !!!");


var http = require("http");
var express = require("express");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var path = require("path");
var defaultRoute = require("./app/routes/default.route.js");


var app = express();
app.use(defaultRoute); 
app.use("/login", express.static(path.join(__dirname, "public/login")));
//init server
var server = http.createServer(app);
server.listen(CONFIG.port);


