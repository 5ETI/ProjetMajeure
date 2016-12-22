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
	DAO.getData(id, "device", function(err, device){
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