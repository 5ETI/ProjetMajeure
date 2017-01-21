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

	function check_attr(smodel){
		if(typeof smodel === "undefined")
		{
			smodel={ id: null, orientation: null, longueur: null,hauteur: null, latitude: null, longitude: null, ville: null, type: null};
		}

}
}
module.exports.DeviceModel = DeviceModel;