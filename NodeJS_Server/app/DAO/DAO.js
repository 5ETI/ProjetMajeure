'use strict';
//var DAO_Connection = require ("./DAO_Connection.js");

var connect = function(conn){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'admin',
		database : 'ProjetMajeure'
	});

	connection.connect();
	return conn(connection);

}

var listVille = function(datatype,value, intemList){
	var Query = "SELECT * from  " + datatype;

	Query += " WHERE `" +  "ville" + "` = '" + value + "'"
	// SELECT * FROM ProjetMajeure.user where `role`= 'manager';
	console.log("tttteeeesssstt : dedans", Query);
	
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
module.exports.listVille = listVille;

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

var listManagerDevice = function (id_manager, itemList)
{
	connect(function(conn){
		var Query = "SELECT DISTINCT * FROM projetmajeure.device WHERE id IN ( SELECT id_device FROM projetmajeure.screen WHERE id_manager = " + id_manager +" );";

		// console.log(Query);
		conn.query(Query, function(err, ItemList) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return itemList(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of devices : ', ItemList);
			return itemList(null, ItemList);
			}
		});
		conn.end();
	});
}
module.exports.listManagerDevice = listManagerDevice;


var listManagerofDevice = function (id_device, itemList)
{
	connect(function(conn){
		//var Query = "SELECT  * FROM projetmajeure.user WHERE id IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = " + id_device +");";
		  var Query = 	"SELECT  * FROM projetmajeure.user WHERE role = 1 AND id IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = "  + id_device +");";
		// console.log(Query);
		conn.query(Query, function(err, ItemList) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return itemList(err);
			}			
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of managers : ', ItemList);
			return itemList(null, ItemList);
			}
		});
		conn.end();
	});
}
module.exports.listManagerofDevice = listManagerofDevice;

var listofManager = function (id_device, itemList)
{
	connect(function(conn){
		//var Query = "SELECT  * FROM projetmajeure.user WHERE id IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = " + id_device +");";
		  //var Query = 	"SELECT  * FROM projetmajeure.user WHERE role = 1 AND id IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = "  + id_device +");";
		  var Query = "SELECT DISTINCT * FROM projetmajeure.user WHERE role = 1 AND id NOT IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = "+ id_device +");";
		// console.log(Query);
		conn.query(Query, function(err, ItemList) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return itemList(err);
			}			
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of managers : ', ItemList);
			return itemList(null, ItemList);
			}
		});
		conn.end();
	});
}
module.exports.listofManager = listofManager;


var listofDevice = function (id_device, itemList)
{
	connect(function(conn){
		//var Query = "SELECT  * FROM projetmajeure.user WHERE id IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = " + id_device +");";
		  //var Query = 	"SELECT  * FROM projetmajeure.user WHERE role = 1 AND id IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = "  + id_device +");";
		  //var Query = "SELECT DISTINCT * FROM projetmajeure.user WHERE role = 1 AND id NOT IN ( SELECT id_manager FROM projetmajeure.screen WHERE id_device = "+ id_device +");";
		  var Query = "SELECT DISTINCT * FROM projetmajeure.device WHERE id NOT IN ( SELECT id_device FROM projetmajeure.screen WHERE id_manager = "+ id_device +");";
		// console.log(Query);
		conn.query(Query, function(err, ItemList) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return itemList(err);
			}			
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of devices : ', ItemList);
			return itemList(null, ItemList);
			}
		});
		conn.end();
	});
}
module.exports.listofDevice = listofDevice;

// var getData = function (id, datatype, callback){
// 	connect(function(conn){
// 		conn.query("SELECT * FROM " + datatype + " WHERE id = '" + id + "';", function(err, Data) {
// 			if (err){
// 				console.log('Error while performing Query.  ' + err);
// 				return callback(err);
// 			}
// 			else
// 			{
// 			//console.log('type of : ', typeof(DeviceList));
// 			console.log(datatype + " of id : " + id +" : \n" , Data);
// 			return callback(null, Data);
// 			}
// 		});
// 		conn.end();
// 	});
// }
// module.exports.getData = getData;


var addDevice = function (device, callback)
{
	connect(function(conn){
		var Query = "INSERT INTO device (`orientation`, `longueur`,`hauteur`, `latitude`, `longitude`,`ville`,`type`) VALUES ('"  + device.orientation +"','" +device.longueur + "','" + device.hauteur + "','" + device.latitude + "','" + device.longitude + "','" + device.ville + "','" + device.typet + "');";

		 console.log("query :", Query);
		conn.query(Query, function(err, Data) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return callback(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			//console.log(datatype + " of id : " + id +" : \n" , Data);
			return callback(null, device);
			}
		});
		conn.end();
	});
}
module.exports.addDevice = addDevice;

var addManager = function (manager, callback)
{
	connect(function(conn){
		var Query = "INSERT INTO user (`email`, `password`,`name`, `role`) VALUES ('"  + manager.email +"','" +manager.password + "','" + manager.name+ "', 1);";

		 console.log("query :", Query);
		conn.query(Query, function(err, Data) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return callback(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			//console.log(datatype + " of id : " + id +" : \n" , Data);
			return callback(null, manager);
			}
		});
		conn.end();
	});
}
module.exports.addManager = addManager;


var deleteData = function(datatype, whereFilter, value, ret)
{

	var Query = "DELETE from " + datatype;
	if (whereFilter != null)
	{
		Query += " WHERE `" +  whereFilter + "` = '" + value + "'"
		// SELECT * FROM ProjetMajeure.user where `role`= 'manager';
	}
	console.log(Query);
	connect(function(conn){

		conn.query(Query, function(err, retval) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return ret(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of ' + datatype + ' : ', retval);
			return ret(null, retval);
			}
		});
		conn.end();
	});
}
module.exports.deleteData = deleteData;

var addDeviceToMana = function (id_manager,id_device, callback)
{
	connect(function(conn){

		//sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options);
		//var Query = "INSERT INTO screen (`id_manager`, `id_device`,`template`) VALUES ('"  + id_manager +"','" +id_device + "', 1);";
		//sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options);

			var Query = "INSERT INTO screen (`id_manager`, `id_device`,`template`) VALUES ('"  + id_manager +"','" +id_device + "', 1);";
		//var Query = "SET foreign_key_checks = 0;";
		 //Query += "INSERT INTO screen (`id_manager`, `id_device`,`template`) VALUES ('"  + id_manager +"','" +id_device + "', 1);";
		 //Query += "INSERT INTO screen (`id_manager`, `id_device`,`template`) VALUES (14,37,1);";
		//Query +="SET foreign_key_checks = 1;";
		 console.log("query :", Query);
		conn.query(Query, function(err, Data) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return callback(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			//console.log(datatype + " of id : " + id +" : \n" , Data);
			return callback(null, Data);
			}
		});
		conn.end();
	});
}
module.exports.addDeviceToMana = addDeviceToMana;