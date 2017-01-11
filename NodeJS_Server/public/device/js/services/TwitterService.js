angular.module('twitterService', []).service('twitter',loadTweets);

loadTweets.$inject=['$http','$q'];

function loadTweets($http, $q) {
	
	var fncContainer={
		loadTweets:loadTweets
	};

	function loadTweets(twitterAccount,nbTweets) {
        var deferred = $q.defer();
        var URL = "http://localhost:1337/twit/" + twitterAccount + "/" + nbTweets;

        $http.get(URL)
            .then(function successCallback(response) {
                return deferred.resolve(response.data);
            }, function errorCallback(response) {
                return deferred.reject(response.status);
            });

        return deferred.promise;
    }
    return fncContainer;
}