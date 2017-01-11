'use strict';
var CONFIG = require("../../config.json");
var DAO_Device = require("./../DAO/DAO.js");
var utils = require("./../utils/utils.js")

var DeviceModel=function(smodel){
	console.log("smodel : ", smodel.orientation);
	console.log("villke : ", smodel.ville);
	console.log("type : ", smodel.type);
	//smodel=check_attr(smodel);
	this.id;
	this.orientation = smodel.orientation;
	this.longueur = smodel.longueur;
	this.hauteur = smodel.hauteur;
	this.latitude = smodel.latitude;
	this.longitude = smodel.longitude;
	this.ville = smodel.ville;
	this.typet = smodel.typet;

	// this.setParameters = function(orientation,longueur, hauteur, latitude, longitude){
	// 	this.orientation = smodel.orientation;
	// 	this.longueur = smodel.longueur;
	// 	this.hauteur = smodel.hauteur;		
	// 	this.latitude = smodel.latitude;
	// 	this.longitude = smodel.longitude;
	// }

	function check_attr(smodel){
		if(typeof smodel === "undefined")
		{
			smodel={ id: null, orientation: null, longueur: null,hauteur: null, latitude: null, longitude: null, ville: null, type: null};
		}
	// 	if (smodel.id === "undefined"){
	// 		smodel.id=null;
	// 		//return console.error("L'id d'un Device ne peut pas être nul");
	// 	}
	// 	if (smodel.orientation === "undefined"){
	// 		smodel.orientation = null;
	// 		//return console.error("L'orientation d'un Device ne peut pas être nul");
	// 	}
	// 	if (smodel.latitude === "undefined"){
	// 		smodel.latitude = null;
	// 		//return console.error("La latitude d'un Device ne peut pas être nul");
	// 	}
	// 	if (smodel.longitude === "undefined"){
	// 		smodel.longitude = null;
	// 		//return console.error("La longitude d'un Device ne peut pas être nul");
	// 	}
	// 	if (smodel.hauteur === "undefined"){
	// 		smodel.hauteur = null;
	// 		//return console.error("L'orientation d'un Device ne peut pas être nul");
	// 	}
	// 	if (smodel.longueur === "undefined"){
	// 		smodel.longueur = null;
	// 		//return console.error("L'orientation d'un Device ne peut pas être nul");
	// 	}
	// 	return smodel;
	// }

}
}
module.exports.DeviceModel = DeviceModel;