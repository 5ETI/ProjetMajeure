"use strict";

var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var ManagerController = require("./../controllers/manager.controller.js");
var ManagerModel=require("./../models/manager.model.js");

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

    router.route("/managers/otherManager/:id_device")
    .get(function (request, response) {
    	var params = request.url.split("/");
		var id_device = params[3];
    	ManagerController.listofManager(id_device,function(err, managerList){
    		if(err){
				console.error(response.statut(500).end);
				return response.statut(500).end;
			}
			else{
				response.json(managerList);
			
			}

    	});
});

       router.route("/managers/delete/:id_manager")
    .get(function (request, response) {
    	var params = request.url.split("/");
		var id_manager = params[3];
    	ManagerController.delManager(id_manager, function(err, device){
		if(err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			response.json(device);
		}
    	});
});


    router.route("/manager/add")
.post(function (request, response) {
	var data = request.body;
	console.log("DATA : " , data);
	var managerToAdd = new ManagerModel.ManagerModel(data);
	console.log("manager : ",managerToAdd);
	ManagerController.addManager(managerToAdd, function(err, manager){
		if (err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			response.json(manager)
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
