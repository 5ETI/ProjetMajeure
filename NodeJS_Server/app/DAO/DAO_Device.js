'use strict';
var DAO_Connection = require ("./DAO_Connection.js");



var list = function(deviceList){
	DAO_Connection.connect(function(conn){
		conn.query('SELECT * from device', function(err, DeviceList) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return deviceList(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('The solution is: ', DeviceList);
			return deviceList(null, DeviceList);
			}
		});
		conn.end();
	});
}
module.exports.list = list;

var getDevice = function (id, device){
	DAO_Connection.connect(function(conn){
		conn.query("SELECT * FROM device WHERE iddevice = '" + id + "';", function(err, Device) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return device(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('The solution is: ', Device);
			return device(null, DeviceList);
			}
		});
		conn.end();
	});
}
module.exports.getDevice = getDevice,