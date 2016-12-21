"use strict";

var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var DeviceController = require("./../controllers/device.controller.js");

router.route("/Device")
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