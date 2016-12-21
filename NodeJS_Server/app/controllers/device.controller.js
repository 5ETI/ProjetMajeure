'use strict';

var DeviceModel = require("./../models/device.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAO_Device = require("./../DAO/DAO_Device.js");


var list = function(DAO_Device_list){
	DAO_Device.list(function(err, deviceList){
		if(err)
		{
			return DAO_Device_list(err);
		}
		else{
			console.log(deviceList);
			return DAO_Device_list(null, deviceList);
		}
	});

}
module.exports.list = list;