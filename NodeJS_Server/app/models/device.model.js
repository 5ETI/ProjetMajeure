'use strict';
var CONFIG = require("../../config.json");
var DAO_Device = require("./../DAO/DAO.js");

var DeviceModel=function(smodel){
	smodel=check_attr(smodel);
	this.id = smodel.id;
	this.orientation = smodel.orientation;
	this.longueur = smodel.longueur;
	this.hauteur = smodel.hauteur;
	this.latitude = smodel.latitude;
	this.longitude = smodel.longitude;

	this.setParameters = function(orientation,longueur, hauteur, latitude, longitude){
		this.orientation = smodel.orientation;
		this.longueur = smodel.longueur;
		this.hauteur = smodel.hauteur;		
		this.latitude = smodel.latitude;
		this.longitude = smodel.longitude;
	}

	function check_attr(smodel){
		if(typeof smodel === "undefined")
		{
			smodel={ id: null, orientation: null, longueur: null,hauteur: null, latitude: null, longitude: null};
		}
		return smodel;
	}

}



	// if (smodel.id === "undefined"){
	// 	return console.error("L'id d'un Device ne peut pas être nul");
	// }
	// if (smodel.orientation === "undefined"){
	// 	return console.error("L'orientation d'un Device ne peut pas être nul");
	// }
	// if (smodel.taille === "undefined"){
	// 	return console.error("La taille d'un Device ne peut pas être nul");
	// }
	// if (smodel.latitude === "undefined"){
	// 	return console.error("La latitude d'un Device ne peut pas être nul");
	// }
	// if (smodel.longitude === "undefined"){
	// 	return console.error("La longitude d'un Device ne peut pas être nul");
	// }
	// if (smodel.orientation === "undefined"){
	// 	return console.error("L'orientation d'un Device ne peut pas être nul");
	// }



	module.exports.DeviceModel = DeviceModel;