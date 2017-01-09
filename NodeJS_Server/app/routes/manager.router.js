"use strict";

var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var ManagerController = require("./../controllers/manager.controller.js");

router.route("/managers/all")
    .get(function (request, response) {
    	ManagerController.list(function(err, managerList){
    		if(err){
				console.error(response.statut(500).end);
				return response.statut(500).end;
			}
			else{
				response.json(managerList);
			
			}

    	});
});

// router.route("/device/:id")
// 	.get(function(request, response) {
// 	var params = request.url.split("/");
// 	var id = params[2];
// 	DeviceController.getDevice(id, function(err, device){
//     		if(err){
// 				console.error(response.statut(500).end);
// 				return response.statut(500).end;
// 			}
// 			else{
// 				response.json(device);
// 			}

//     	});
// });
