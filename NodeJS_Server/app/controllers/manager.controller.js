'use strict';

//var ManagerModel = require("./../models/manager.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAO = require("./../DAO/DAO.js");


var list = function(DAO_Managers_list){
	DAO.list("user","role","manager", function(err, managerList){
		if(err)
		{
			console.log(err);
			return DAO_Managers_list(err);
		}
		else{
			//console.log(deviceList);
			return DAO_Managers_list(null, managerList);
		}
	});

}
module.exports.list = list;