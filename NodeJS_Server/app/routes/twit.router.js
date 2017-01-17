"use strict";
var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var TwitController = require("./../controllers/twit.controller.js");

router.route("/twit/:username/:nbTwits")
.get(function (request, response) {
	response.header('Access-Control-Allow-Origin', 'http://192.168.1.25:1337');
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
	var params = request.url.split("/");
	var username = params[2];
	var nbTwits = params[3];
	TwitController.getTwit(username, nbTwits, function(err, twits){
		if(err){
			console.error(err);
			return response.statut(500).end;
		}
		else{
			response.json(twits);
		}

	});
});