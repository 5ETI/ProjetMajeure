'use strict';

//var DeviceModel = require("./../models/device.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAO = require("./../DAO/DAO.js");


/*var getScreen = function(id, DAO_screen){
	DAO.list("screen", "id",id, function(err, screen){
		if(err)
		{
			console.log(err);
			return DAO_screen(err);
		}
		else{
			//console.log(screen);
			return DAO_screen(null, screen);
		}

	});
};
module.exports.getScreen = getScreen;*/

var getScreen = function(id_manager, id_device, DAO_screen){
	DAO.getScreen(id_manager, id_device, function(err, screen){
		if(err)
		{
			console.log(err);
			return DAO_screen(err);
		}
		else{
			//console.log(screen);
			return DAO_screen(null, screen);
		}

	});
};
module.exports.getScreen = getScreen;


var getContent = function(id_screen, DAO_content){
	DAO.getContent(id_screen, function(err, content){
		if(err)
		{
			return DAO_content(err);
		}
		else{
			//console.log("screen.controller.js" + content);
			return DAO_content(null, content);
		}

	});
};
module.exports.getContent = getContent;

var deleteContent = function(id_screen, DAO_delete){
	DAO.deleteContent(id_screen, function (err, resp){
		if(err){
			console.log("screen.controller.js err" + err);
			return DAO_delete(err);
		}else{
			console.log("screen.controller.js" + resp);
			return DAO_delete(null, resp);
		}
	});
};
module.exports.deleteContent = deleteContent;


var saveContent = function(id_screen, contents, DAO_save){
	DAO.saveContent(id_screen, contents, function (err, resp){
		if(err){
			console.log(err);
			return DAO_save(err);
		}else{
			return DAO_save(null, resp);
		}
	});
};
module.exports.saveContent = saveContent;

