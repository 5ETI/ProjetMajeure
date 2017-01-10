"use strict";


//var DeviceModel=require("./../models/device.model.js");
var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var ScreenController = require("./../controllers/screen.controller.js");

router.route("/screen/:id")
.get(function(request, response) {
	var params = request.url.split("/");
	var id = params[2];
	ScreenController.getScreen(id, function(err, screen){
		if(err){
			console.error(response.statut(500).end);
			return response.statut(500).end;
		}
		else{
			console.log(screen);
			response.json(screen);
		}

	});
});