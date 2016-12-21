'use strict';

var DeviceModel = require("./../models/device.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAO_Device = require("./../DAO/DAO_Device.js");


var list = function(callback){
	DAO_Device.list(function(err, deviceList){
	if(err)
	{
		return response.statut(500).end;
    }
    else{
    	console.log(deviceList);
    	return callback(null, deviceList);
       }
	});



	// var mysql      = require('mysql');
	// var connection = mysql.createConnection({
	// 	host     : 'localhost',
	// 	user     : 'root',
	// 	password : 'root',
	// 	database : 'ProjetMajeure'
	// });

	// connection.connect();

	// connection.query('SELECT * from device', function(err, deviceList) {
	// 	if (err){
	// 		console.log('Error while performing Query.  ' + err);
	// 		return callback(err);
			
	// 	}
	// 	else
	// 	{
	// 		//console.log('type of : ', typeof(DeviceList));
	// 		//console.log('The solution is: ', DeviceList);
	// 		return callback(null, deviceList);
	// 	}
		
	// });
	// connection.end();
//Appel DAO -> Liste JSON
//module.exports.list = list;

}
module.exports.list = list;