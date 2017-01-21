'use strict';

var fs = require("fs");
var path = require("path");
var CONFIG = JSON.parse(process.env.CONFIG);


var tokenMap = {};

module.exports = this;

this.generateUUID = function() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};

this.addToken = function(name, token){
	tokenMap[name] = token;
	console.log("token added   " , tokenMap);

};
this.checkUser = function(name, token){
	console.log("TOKENMAP     ======     ", tokenMap);
	console.log(name in tokenMap);
	console.log(name);
	if (name in tokenMap){
		if (token == tokenMap[name]){
			console.log ("Ok, token valid");
			return true;
		}
		console.log("name in tokenMap but false token");
	}
	console.log("name not in tokenMap");
	return false;

};