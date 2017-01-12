angular.module('loginService', []).service('login',authFnc);

authFnc.$inject=['$http','$q'];

function authFnc($http, $q) {
	
	var fncContainer={
		authAsk:authAsk
	};

	function authAsk(login,pwd){
		var deferred = $q.defer();
		//TODO Here change route to nodeJSroute /auth
		$http.post('http://localhost:8080/auth/rest/auth/', {'email':login,'password':pwd})
   			.then(function successCallback(response) {
    				return deferred.resolve(response.data);
  				}, function errorCallback(response) {
    				return deferred.reject(response.status);
  			});
		
		return deferred.promise;
    }
    return fncContainer;
}