console.log("it works !!!");


var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');;;;;;;;;;;;;;;;;;

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var path = require("path");
//var defaultRoute = require("./app/routes/default.route.js");

var deviceRoute  = require("./app/routes/device.router.js");
var managerRoute  = require("./app/routes/manager.router.js");
var twitRoute = require("./app/routes/twit.router.js");
var screenRoute  = require("./app/routes/screen.router.js");
var authRoute = require("./app/routes/auth.router.js");





var checkauth = function(req, res, next) {
    console.log('Hello from checkauth!');
    console.log(req.header);
    next();
};
//app.use(staticMiddleware, express.static(__dirname + '/public'));


var app = express();
app.use(bodyParser.json());
//app.use(defaultRoute); 
app.use(deviceRoute);
app.use(managerRoute);
app.use(twitRoute);

//app.use("/", express.static(path.join(__dirname, "public/login")));

app.use(authRoute);

app.use(screenRoute);
app.use("/", express.static(path.join(__dirname, "public/login")));
app.use("/manager",checkauth, express.static(path.join(__dirname, "public/manager")));
//init server
var server = http.createServer(app);
server.listen(CONFIG.port);

