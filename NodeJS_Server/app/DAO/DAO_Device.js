'use strict';




var list = function(deviceList){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'ProjetMajeure'
	});

	connection.connect();

	connection.query('SELECT * from device', function(err, DeviceList) {
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
	connection.end();
	

}
module.exports.list = list;