angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','factory','comm'];

function eventCrtFnt($scope, $log, $window, factory, comm){

  $scope.deviceMap={};
  $scope.deviceMap.payload="";

    var id_manager = 1; // TODO 1 is default manager id, get real manager id

    var available_device=comm.loadDevicesList(id_manager);
    available_device.then(
      function(payload) { 
        $scope.deviceMap.payload = payload;
        $scope.deviceMap.array=factory.mapToArray(payload);
      },
      function(errorPayload) {
        $log.error('failure loading devices', errorPayload);
      });
    
    /*$scope.selectDevice = function(payload) { 
      $scope.deviceMap.payload= payload;             
      for(key in $scope.deviceMap.payload){
        $scope.currentDevice = $scope.deviceMap.payload[key];
      }  
    },
    function(errorPayload) {
      $log.error('failure loading movie', errorPayload);
    }*/


    $scope.selectCurrentDevice=function(deviceId){
      $scope.currentDevice=$scope.deviceMap.array[deviceId];

      var available_device=comm.loadTemplate(deviceId);
      available_device.then(
        function(payload) { 
          $scope.currentDevice.template = payload[0].template;
        },
        function(errorPayload) {
          $log.error('failure loading template', errorPayload);
        });
    }
    
    
  };
