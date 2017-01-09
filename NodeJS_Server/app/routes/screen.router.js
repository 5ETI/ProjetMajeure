"use strict";


//var DeviceModel=require("./../models/device.model.js");
var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var ScreenController = require("./../controllers/screen.controller.js");

router.route("/screen/:id_manager/:id_device")
.get(function(request, response) {
	var params = request.url.split("/");
	var id_manager = params[2];
	var id_device = params[3];
	ScreenController.getScreen(id_manager, id_device, function(err, id_screen){
		if(err){
			console.error(response.statut(500).end);
			return response.statut(500).end;
		}
		else{
			console.log(id_screen);
			response.json(id_screen);
		}

	});
});

router.route("/content/:id_screen")
.get(function(request, response) {
	var params = request.url.split("/");
	var id_screen = params[2];
	ScreenController.getContent(id_screen, function(err, content){
		if(err){
			console.error(response.statut(500).end);
			return response.statut(500).end;
		}
		else{
			console.log(content);
			response.json(content);
		}

	});
});

/*router.route("/screen/:id")
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
});*/