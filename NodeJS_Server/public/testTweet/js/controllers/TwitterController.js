angular.module('twitterApp')

.controller('twitterCtrl',twitterCrtFnt);

twitterCrtFnt.$inject=['$scope','$log','$window', '$sce','$interval', 'twitter'];

function twitterCrtFnt($scope, $log, $window, $sce, $interval, twitter){ 

	

	var available_tweets=twitter.loadTweets("nike", 10);
	available_tweets.then(
		function(payload) { 
	//	$scope.error = false;
	$log.info('dans ctrl');
	var i = 0, len = payload.length;
	var updateTweet = function(){
		if (i>=len-1){
			i=0;
		}
		i+=1
		var item = {"html": payload[i].html};
	//var tweet = $scope.tweet;
		$scope.iframelyHtml = $sce.trustAsHtml(item.html);

	};
	$interval(updateTweet, 10000);

	
	//$scope.tweet = {}
	//$scope.tweet.html = "<blockquote class=\"twitter-tweet\" data-conversation=\"none\" data-width=\"305\"><p lang=\"en\" dir=\"ltr\"><a href=\"https://twitter.com/angivalenti\">@angivalenti</a> We appreciate that, Angie.</p>&mdash; adidas (@adidas) <a href=\"https://twitter.com/adidas/status/816963253599342592\">January 5, 2017</a></blockquote>\n";
});
}