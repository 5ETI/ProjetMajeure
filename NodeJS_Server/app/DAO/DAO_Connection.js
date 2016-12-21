
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

module.exports.connect = connect;