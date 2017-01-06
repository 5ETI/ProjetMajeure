'use strict';

//var DeviceModel = require("./../models/device.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAO = require("./../DAO/DAO.js");


var getScreen = function(id, DAO_Device_info){
	DAO.list("screen", "id",id, function(err, screen){
		if(err)
		{
			console.log(err);
			return DAO_Device_info(err);
		}
		else{
			//console.log(screen);
			return DAO_Device_info(null, screen);
		}

	});
};
module.exports.getScreen = getScreen;