'use strict';
var CONFIG = JSON.parse(process.env.CONFIG);
var DAO_Device = require("./app/DAO/DAO_Device.js");

var DeviceModel=function(smodel){
	smodel=check_attr(smodel);
	this.id = smodel.id;
	this.orientation = smodel.orientation;
	this.taille = smodel.taille;
	this.latitude = smodel.latitude;
	this.longitude = smodel.longitude;
	this.orientation = smodel.orientation;

	function check_attr(smodel){
		if(typeof smodel === "undefined")
		{
			smodel={type: null, id: null, title: null, filename: null, data: null};
		}
		return smodel;
	}

}

DeviceModel.create = function(Device,callback) {
	//Crée un device dans la BD
	if (Device.id === "undefined"){
		return console.error("L'id d'un Device ne peut pas être nul");
	}
	if (Device.orientation === "undefined"){
		return console.error("L'orientation d'un Device ne peut pas être nul");
	}
	if (Device.taille === "undefined"){
		return console.error("La taille d'un Device ne peut pas être nul");
	}
	if (Device.latitude === "undefined"){
		return console.error("La latitude d'un Device ne peut pas être nul");
	}
	if (Device.longitude === "undefined"){
		return console.error("La longitude d'un Device ne peut pas être nul");
	}
	if (Device.orientation === "undefined"){
		return console.error("L'orientation d'un Device ne peut pas être nul");
	}
	callback(DAO_Device.insert(Device));


	};

DeviceModel.delete = function(id, callback){
	//Supprime un device dans la BD par appel au DAO
}


DeviceModel.list = function (callback) {
	//List all devices of the database
	callback(DAO_Device.list());
}
DeviceModel.getDevice = function(id, callback){
	//return 1 device
}

module.exports = DeviceModel;