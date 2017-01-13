'use strict';
var CONFIG = require("../../config.json");
var DAO_Device = require("./../DAO/DAO.js");
var utils = require("./../utils/utils.js")


var ManagerModel=function(smodel){
	console.log("smodel : ", smodel.orientation);
	console.log("villke : ", smodel.ville);
	console.log("type : ", smodel.type);
	//smodel=check_attr(smodel);
	
	this.email = smodel.email;
	this.password = smodel.password;
	this.name = smodel.name;

}

module.exports.ManagerModel = ManagerModel;