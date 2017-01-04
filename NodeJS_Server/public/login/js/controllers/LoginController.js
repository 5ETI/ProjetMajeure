angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log','login','$window'];

function loginCrtFnt($scope, $log, login, $window){ 

	$scope.error = false;
	
	$scope.logAuth = function() {
		$log.info('user login', $scope.user.login);
		$log.info('user pwd', $scope.user.pwd);


		var futurContent=login.authAsk($scope.user.login,$scope.user.pwd);
		futurContent.then(
			function(payload){
				if(payload == '')
					$scope.error = true ;
				if(payload.role == 'ADMIN')
					$window.location.href = '../admin/index.html';
				if(payload.role == 'MANAGER')
					$window.location.href = '../manager/index.html';
				if(payload.role == 'DEVICE')
					$window.location.href = '../device/index.html';
			},
			function(errorPayload){

			});

	};

}