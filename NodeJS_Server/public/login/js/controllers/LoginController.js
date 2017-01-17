angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', '$cookies', '$http','login','$window', '$sessionStorage'];

function loginCrtFnt($scope, $log, $cookies, $http, login, $window, $sessionStorage){

	$scope.error = false;

	$scope.logAuth = function() {
		$log.info('user login', $scope.user.login);
		$log.info('user pwd', $scope.user.pwd);


		//If wildfly not available, use these credentials: nojeemanager/manager
		if($scope.user.login == 'nojeemanager' && $scope.user.pwd == 'manager'){
			$window.location.href = '../manager/index.html';
		}


		var futurContent=login.authAsk($scope.user.login,$scope.user.pwd);
		futurContent.then(
			function(payload){
				if(payload == '')
					$scope.error = true ;
				if(payload.role == 'ADMIN')
					$window.location.href = '../admin/index.html';
				if(payload.role == 'MANAGER') {
					$log.info ('payload :    ', payload);
					$cookies.put('token', payload.token, {path:"../"});
					$cookies.put('name', payload.name, {path:"../"});
					$sessionStorage.user = payload;
                    //$log.info ($sessionStorage.user.token);
                    //$http.defaults.headers.common['token'] = $sessionStorage.user.token;
                    //$log.info ($http.defaults.headers.common);
                    $window.location.href = '/manager';
                    $http.defaults.headers.common['x-access-token'] = $sessionStorage.user.token;
                    $log.info ($http.defaults.headers.common);
                    $log.info("after location Href" );
                }
				if(payload.role == 'DEVICE')
					$window.location.href = '../device/index.html';

            },
			function(errorPayload){

			});

	};

}