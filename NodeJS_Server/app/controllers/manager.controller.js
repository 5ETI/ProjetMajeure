'use strict';

//var ManagerModel = require("./../models/manager.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAO = require("./../DAO/DAO.js");


var list = function(DAO_Managers_list){
	DAO.list("user","role",1, function(err, managerList){
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

var listofManager = function(id_device,DAO_Managers_list){
		DAO.listofManager(id_device, function(err, managerList){
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
module.exports.listofManager = listofManager;


var addManager = function(manager, Dao_add_manager){
	
	 	DAO.addManager(manager, function(err, manager){
	 		if(err)
	 		{
	 			console.log(err);
	 			return Dao_add_manager(err);
	 		}
	 		else{
			//console.log(device);
			return Dao_add_manager(null, manager);
		}

	});


	// TODO Here check devices attributs and call DAO_device to add in db

};
module.exports.addManager = addManager;


var delManager = function(id, DAO_Manager_info){
	if (id != null){
		DAO.deleteData("user", "id", id, function(err, manager){
			if(err)
			{
				console.log(err);
				return DAO_Manager_info(err);
			}
			else{
			//console.log(device);
			return DAO_Manager_info(null, manager);
		}

	});
	}
	else{
		
	}
};
module.exports.delManager = delManager;