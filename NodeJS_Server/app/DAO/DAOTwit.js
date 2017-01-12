'use strict';
var Twitter = require('mtwitter');


var DaoGetTwit = function(accountname, nbtwits, intemList){
	var twitter = new Twitter({
		consumer_key: 'Q8muyflJGzegAbSKZ5Jjd8aZ0',
		consumer_secret: 'BnWvbCjAVl7gpGVHmNEIHGkD06kWDyR4G1SIGKdbnfq0nM0UUn',
		application_only: true
	});
	var MAX_WIDTH = 200;
	var URL_1 = '/statuses/user_timeline.json?screen_name=' + accountname + '&count=' + nbtwits;
	console.log("URL_1 : ", URL_1);
	var URL_2 = 'statuses/oembed';
	var twits = [];
	var  oEmbedTweetsList = [];
	
	twitter.get(URL_1, function (error, data) {
		if (error){return intemList(error, null);}
		//console.log(error);
		twits = data;
		//console.log(twits);
		for (var i=0; i<twits.length; i++){
			var params = {
				"id": twits[i].id_str,
				"maxwidth": MAX_WIDTH,
				"hide_media" : false
				};
			twitter.get(URL_2, params, function (err, data) {
				if (err){
					return err;
					console.log(err);
				}
				var tempOembedTwit = data;
				
				oEmbedTweetsList.push(tempOembedTwit);
				//console.log(oEmbedTweetsList);
				console.log ("i : ", i);
				console.log("twits.length : ", twits.length);;;;;;
				if (oEmbedTweetsList.length == twits.length){
					console.log("in if ////");
					return intemList(null, oEmbedTweetsList);
				}
			});
		}
});
};
module.exports.DaoGetTwit = DaoGetTwit;


