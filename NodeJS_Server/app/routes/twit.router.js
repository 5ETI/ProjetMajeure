"use strict";
var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var TwitController = require("./../controllers/twit.controller.js");

router.route("/twit/:username/:nbTwits")
.get(function (request, response) {
	var params = request.url.split("/");
	var username = params[2];
	var nbTwits = params[3];
	TwitController.getTwit(username, nbTwits, function(err, twits){
		if(err){
			console.error(response.statut(500).end);
			return response.statut(500).end;
		}
		else{
			response.json(twits);
		}

	});
});