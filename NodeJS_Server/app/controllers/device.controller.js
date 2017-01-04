'use strict';

var DeviceModel = require("./../models/device.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAO = require("./../DAO/DAO.js");


var list = function(DAO_Device_list){
	DAO.list("device",null, null, function(err, deviceList){
		if(err)
		{
			console.log(err);
			return DAO_Device_list(err);
		}
		else{
			//console.log(deviceList);
			return DAO_Device_list(null, deviceList);
		}
	});

}
module.exports.list = list;

var getDevice = function(id, DAO_Device_info){
	DAO.list("device", "id",id, function(err, device){
		if(err)
		{
			console.log(err);
			return DAO_Device_info(err);
		}
		else{
			//console.log(device);
			return DAO_Device_info(null, device);
		}

	});
};
module.exports.getDevice = getDevice;


var addDevice = function(device, Dao_add_device){
	 	if (device.id === "undefined"){
	 		return new Error("device id cannot be undfined");
	 		//return console.error("L'id d'un Device ne peut pas être nul");
	 	}
	 	if (device.orientation === "undefined"){
	 		return new Error("device orientation cannot be undfined");
	 		//return console.error("L'orientation d'un Device ne peut pas être nul");
	 	}
	 	if (device.latitude === "undefined"){
	 		return new Error("device latitude cannot be undfined");
	 		//return console.error("La latitude d'un Device ne peut pas être nul");
	 	}
	 	if (device.longitude === "undefined"){
	 		return new Error("device longitude cannot be undfined");
	 		//return console.error("La longitude d'un Device ne peut pas être nul");
	 	}
	 	if (device.hauteur === "undefined"){
	 		return new Error("device hauteur cannot be undfined");
	 		//return console.error("L'orientation d'un Device ne peut pas être nul");
	 	}
	 	if (device.longueur === "undefined"){
	 		return new Error("device longueur cannot be undfined");
	 		//return console.error("L'orientation d'un Device ne peut pas être nul");
	 	}
	 	DAO.addDevice(device, function(err, device){
		if(err)
		{
			console.log(err);
			return Dao_add_device(err);
		}
		else{
			//console.log(device);
			return Dao_add_device(null, device);
		}

	});


	// TODO Here check devices attributs and call DAO_device to add in db

};
module.exports.addDevice = addDevice;