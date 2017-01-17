console.log("it works !!!");


var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var path = require("path");
//var defaultRoute = require("./app/routes/default.route.js");

var deviceRoute  = require("./app/routes/device.router.js");
var managerRoute  = require("./app/routes/manager.router.js");
var twitRoute = require("./app/routes/twit.router.js");
var screenRoute  = require("./app/routes/screen.router.js");
var authRoute = require("./app/routes/auth.router.js");
var utils = require("./app/utils/utils.js");
var cookieParser = require('cookie-parser');


var checkauth = function(req, res, next) {
    // If just logged (token in cookie)
    try {
        console.log("req cookie===========      ", req.headers.cookie);// -> va direct au catch (error si non définit))
        var cook = req.headers.cookie.split(";");
        var token = cook[0].split("=")[1];
        var name =  cook[1].split("=")[1];
        //console.log("token", token);
        //console.log("name", name);
        //console.log(token);
        //console.log(name);
        if (utils.checkUser(name, token)) {
            console.log("ok thxs to cookie");
            next();
        }
        else{
            res.status(500).send('You must login first');
        }

    }catch (e){
        console.log("auth from cookie failed, then we check from header");
        // Or we check from header
        //console.log("NAME FROM TOKEN", jwt.verify(req.headers['token'], 'adPanelKey')['name']);
        try  {
            utils.checkUser(jwt.verify(req.headers['token'], 'adPanelKey')['name'], req.headers['token']);
            console.log("ok thxs to header");
            next();
        } catch(e) {
            //next();
            res.status(500).send('You must login first, no token in cookie or header');
        }
    }
};
//app.use(staticMiddleware, express.static(__dirname + '/public'));


var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
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

