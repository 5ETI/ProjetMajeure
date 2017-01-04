"use strict";


var DeviceModel=require("./../models/device.model.js");
var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var DeviceController = require("./../controllers/device.controller.js");

router.route("/device/all")
    .get(function (request, response) {
    	DeviceController.list(function(err, deviceList){
    		if(err){
				console.error(response.statut(500).end);
				return response.statut(500).end;
			}
			else{
				response.json(deviceList);
			}

    	});
});
router.route("/device/:id")
	.get(function(request, response) {
	var params = request.url.split("/");
	var id = params[2];
	DeviceController.getDevice(id, function(err, device){
    		if(err){
				console.error(response.statut(500).end);
				return response.statut(500).end;
			}
			else{
				response.json(device);
			}

    	});
});

	router.route("/device/add")
		.post(function (request, response) {
			var data = request.body;
			console.log("DATA : " , data);
			var deviceToAdd = new DeviceModel.DeviceModel(data);
			console.log(deviceToAdd);
			DeviceController.addDevice(deviceToAdd, function(err, device){
				if (err){
					console.error(response.statut(500).end);
					return response.statut(500).end;
				}
				else{
					response.json(device)
				}
			});

			// var id = request.body.id;
			// var orientation = request.body.orientation;
			// var longueur = request.body.longueur;
			// var hauteur = request.body.hauteur;
			// var latitude = request.body.latitude;
			// var longitude = request.body.longitude;

		});

