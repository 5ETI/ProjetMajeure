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

});

router.route("/device/delete/:id")
.get(function(request, response) {
	var params = request.url.split("/");
	var id = params[3];
	DeviceController.delDevice(id, function(err, device){
		if(err){
			console.error(response.statut(500).end);
			return response.statut(500).end;
		}
		else{
			response.json(device);
		}

	});
});

///////////////////////////Test twitter ///////////////////////////
// router.route("/twitter")
// .get(function(request, response) {
// 	var Twitter = require('mtwitter');
// 	var twitter = new Twitter({
// 		consumer_key: 'Q8muyflJGzegAbSKZ5Jjd8aZ0',
// 		consumer_secret: 'BnWvbCjAVl7gpGVHmNEIHGkD06kWDyR4G1SIGKdbnfq0nM0UUn',
// 		application_only: true
// 	});

// 	twitter.get(
// 		'https://twitter.com/redbull/',
// 		function logResponse(error, data, res) {
// 			console.log('Error? ', error);
// 			console.log('Parsed object of data: ', data);
// 			//console.log('Raw HTTP response: ', response);
// 			res.send(data);
// 		});
// });