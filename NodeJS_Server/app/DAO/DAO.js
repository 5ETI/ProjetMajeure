'use strict';
//var DAO_Connection = require ("./DAO_Connection.js");

var connect = function(conn){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'projetmajeure',
		port     : 3306

	});

	connection.connect();
	return conn(connection);

};

var listVille = function(datatype,value, intemList){
	var Query = "SELECT * from  " + datatype;

	Query += " WHERE `" +  "ville" + "` = '" + value + "'";
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
};
module.exports.listVille = listVille;

var list = function(datatype, whereFilter, value, intemList){
	var Query = "SELECT * from  " + datatype;
	if (whereFilter != null)
	{
		Query += " WHERE `" +  whereFilter + "` = '" + value + "'";
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
};
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
};
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


var setTemplate = function (id_screen, id_template, ret)
{
	connect(function(conn){
		var Query = "UPDATE ProjetMajeure.screen SET `template` = " + id_template + " WHERE id = " + id_screen;

		// console.log(Query);
		conn.query(Query, function(err, callback) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return ret(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			//console.log('List of devices : ', Screen);
			return ret(null, callback);
		}
	});
		conn.end();
	});
}
module.exports.setTemplate = setTemplate;


var getContent = function (id_screen, content)
{
	connect(function(conn){
		var Query = "SELECT * FROM projetmajeure.content WHERE id IN ( SELECT id_content FROM projetmajeure.screen_content WHERE id_screen = " + id_screen + " );";

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
			return callback(null, Data);
		}
	});
		conn.end();
	});
};
module.exports.addDevice = addDevice;


var deleteData = function(datatype, whereFilter, value, ret)
{

	var Query = "DELETE from " + datatype;
	if (whereFilter != null)
	{
		Query += " WHERE `" +  whereFilter + "` = '" + value + "'";
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
};
module.exports.deleteData = deleteData;


var deleteContent = function (id_screen, ret){

	var query = "DELETE FROM projetmajeure.content WHERE id IN ( SELECT id_content FROM projetmajeure.screen_content WHERE id_screen = '" + id_screen +"')";

	connect(function(conn){
		conn.query(query, function(err, resp) {
			if (err){
				console.log('Error while performing query.  ' + err);
				return ret(err);
			}
			else{
				return ret(null, resp);
			}
		});
		conn.end();
	});

};
module.exports.deleteContent = deleteContent;

var saveContents = function (id_screen, contents, ret){

	console.log("contents.length " + contents.length);
	console.log('id_screen  ' + id_screen);
	console.log('contents :   ' + contents);
	
	for (var i=0; i< contents.length; i++){

		if( contents[i].param1 != '' || ( contents[i].param1 == '' && contents[i].type == 0 )){

			(function(i){
				var query = "INSERT INTO content (`type`, `index`, `param1`) VALUES";
				query += "('" + contents[i].type + "','" + contents[i].index + "','" + contents[i].param1 + "');";

				console.log(query);

				connect(function(conn){
					conn.query(query, function(err, sqlInfo) {
						if (err){
							console.log('Error while performing query.  ' + err);
							return ret(err);
						}
						else{
							console.log('sqlInfo.insertId  ' + sqlInfo.insertId);
							console.log('id_screen  ' + id_screen);

							console.log(query);

							query = "INSERT INTO screen_content (`id_screen`, `id_content`) VALUES";
							query += "('" + id_screen + "', '" + sqlInfo.insertId +"' );";
							connect(function(conn){
								conn.query(query, function(err, sqlInfo) {
									if (err){
										console.log('Error while performing query.  ' + err);
										return ret(err);
									}
									else{	
										// return ret(null, sqlInfo);
									}
								});
								conn.end();
							});

							//return ret(null, sqlInfo);

						}
					});
					conn.end();
				});
			})(i);
		
		}
		
	}

	ret(null,"ok");

};
module.exports.saveContents = saveContents;

var getImagesId = function (ret){

	connect(function(conn){
		var Query = "SELECT * FROM projetmajeure.content WHERE type = 2;";

		// console.log(Query);
		conn.query(Query, function(err, imagesId) {
			if (err){
				console.log('Error while performing Query.  ' + err);
				return ret(err);
			}
			else
			{
			//console.log('type of : ', typeof(DeviceList));
			console.log('List of images id : ', imagesId);
			return ret(null, imagesId);
		}
	});
		conn.end();
	});

};
module.exports.getImagesId = getImagesId;
