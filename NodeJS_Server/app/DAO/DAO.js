'use strict';
//var DAO_Connection = require ("./DAO_Connection.js");

var connect = function(conn){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'ProjetMajeure'
	});

	connection.connect();
	return conn(connection);

}

var list = function(datatype, whereFilter, value, intemList){
	var Query = "SELECT * from  " + datatype;
	if (whereFilter != null)
	{
		Query += " WHERE `" +  whereFilter + "` = '" + value + "'"
		// SELECT * FROM ProjetMajeure.user where `role`= 'manager';
	}
	connect(function(conn){

		conn.query(Query, function(err, ItemList) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return intemList(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of ' + datatype + ' : ', ItemList);
			return intemList(null, ItemList);
			}
		});
		conn.end();
	});
}
module.exports.list = list;


var getData = function (id, datatype, callback){
	connect(function(conn){
		conn.query("SELECT * FROM " + datatype + " WHERE id = '" + id + "';", function(err, Data) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return callback(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log(datatype + " of id : " + id +" : \n" , Data);
			return callback(null, Data);
			}
		});
		conn.end();
	});
}
module.exports.getData = getData;


var addDevice = function (device, callback)
{

}