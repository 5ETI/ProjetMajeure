console.log("it works !!!");


var http = require("http");
var express = require("express");
var bodyParser = require('body-parser')

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var path = require("path");
//var defaultRoute = require("./app/routes/default.route.js");

var deviceRoute  = require("./app/routes/device.router.js");
var managerRoute  = require("./app/routes/manager.router.js");



var app = express();
app.use(bodyParser.json());
//app.use(defaultRoute); 
app.use(deviceRoute);
app.use(managerRoute);
app.use("/", express.static(path.join(__dirname, "public/login")));
//init server
var server = http.createServer(app);
server.listen(CONFIG.port);


//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Twitter test   /////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// var OAuth2 = require('oauth').OAuth2;
// var oauth2 = new OAuth2(Q8muyflJGzegAbSKZ5Jjd8aZ0, 'BnWvbCjAVl7gpGVHmNEIHGkD06kWDyR4G1SIGKdbnfq0nM0UUn', 'https://api.twitter.com/', null, 'oauth2/token', null);

// oauth2.getOAuthAccessToken('', {
//     'grant_type': 'client_credentials'
//   }, function (e, access_token) {
//       console.log(access_token); //string that we can use to authenticate request
// });

var Twitter = require('mtwitter');
var twitter = new Twitter({
	consumer_key: 'Q8muyflJGzegAbSKZ5Jjd8aZ0',
	consumer_secret: 'BnWvbCjAVl7gpGVHmNEIHGkD06kWDyR4G1SIGKdbnfq0nM0UUn',
	application_only: true
});



twitter.get('/statuses/user_timeline.json?screen_name=redbull&count=10', function(error, tweets, response) {
	//console.log(error);
	for (i=0; i<tweets.length; i++){
		console.log(tweets[i].id_str);
	}
   //console.log(tweets.id);
   //response.send(tweets);
});
  //console.log('Raw HTTP response: ', response);
  //response.send(data);
//});
