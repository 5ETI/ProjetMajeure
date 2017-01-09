'use strict';
//var DAO_Connection = require ("./DAO_Connection.js");

var connect = function(conn){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '1234',
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
		var Query = "SELECT DISTINCT * FROM projetmajeure.device WHERE id IN ( SELECT id FROM projetmajeure.screen WHERE id_manager = " + id_manager +" );";

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

var getScreen = function (id_manager, id_device, screen)
{
	connect(function(conn){
		var Query = "SELECT * FROM projetmajeure.screen WHERE id_manager = " + id_manager + " AND id_device = " + id_device;

		// console.log(Query);
		conn.query(Query, function(err, Screen) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return screen(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of devices : ', Screen);
			return screen(null, Screen);
			}
		});
		conn.end();
	});

}
module.exports.getScreen = getScreen;

var getContent = function (id_screen, content)
{
	connect(function(conn){
		var Query = "SELECT * FROM projetmajeure.content WHERE id IN ( SELECT id FROM projetmajeure.screen_content WHERE id_screen = " + id_screen + " );";

		// console.log(Query);
		conn.query(Query, function(err, Content) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return content(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of devices : ', Content);
			return content(null, Content);
			}
		});
		conn.end();
	});
}
module.exports.getContent = getContent;

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
		var Query = "INSERT INTO device (`orientation`, `longueur`,`hauteur`, `latitude`, `longitude`) VALUES('"  + device.orientation +"','" +device.longueur + "','" + device.hauteur + "','" + device.latitude + "','" + device.longitude + "')";
		// console.log(Query);
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