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

};
module.exports.list = list;

var listVille = function(ville,DAO_Device_list){
	DAO.list("device","ville", ville, function(err, deviceList){
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
module.exports.listVille = listVille;

var getManagerDevices = function(id_manager, DAO_Device_list){
	DAO.listManagerDevice(id_manager, function(err, deviceList){
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
module.exports.getManagerDevices = getManagerDevices;

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

var getManagerofDevice = function(id, DAO_Device_info){
	DAO.listManagerofDevice(id, function(err, manager){
		if(err)
		{
			console.log(err);
			return DAO_Device_info(err);
		}
		else{
			//console.log(device);
			return DAO_Device_info(null, manager);
		}

	});
};
module.exports.getManagerofDevice = getManagerofDevice;



var addDevice = function(device, Dao_add_device){
	
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
	 	if (device.ville === "undefined"){
	 		return new Error("device ville cannot be undfined");
	 		//return console.error("L'orientation d'un Device ne peut pas être nul");
	 	}
	 	if (device.type === "undefined"){
	 		return new Error("device type cannot be undfined");
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

var delDevice = function(id, DAO_Device_info){
	if (id != null){
		DAO.deleteData("device", "id", id, function(err, device){
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
	}
	else{
		
	}
};
module.exports.delDevice = delDevice;

var listformanager = function(id, DAO_Device_info){
	if (id != null){
		DAO.listofDevice(id, function(err, device){
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
	}
	else{
		
	}
};
module.exports.listformanager = listformanager;

var addDeToMa = function(id_manager,id_device, DAO_Device_info){
	if (id_manager != null || id_device != null){
		DAO.addDeviceToMana(id_manager,id_device, function(err, data){
			if(err)
			{
				console.log(err);
				return DAO_Device_info(err);
			}
			else{
			//console.log(device);
			return DAO_Device_info(null, data);
		}

	});
	}
	else{
		
	}
};
module.exports.addDeToMa = addDeToMa;