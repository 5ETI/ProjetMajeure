
var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAOTwit = require("./../DAO/DAOTwit.js");

var getTwit = function(username, nbTwits, Twit_list){
	DAOTwit.DaoGetTwit(username, nbTwits, function(err, twit){
		if(err)
		{
			console.log(err);
			return Twit_list(err);
		}
		else{
			//console.log(deviceList);
			return Twit_list(null, twit);
		}
	});

}
module.exports.getTwit = getTwit;