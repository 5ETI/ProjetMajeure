angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','factory','comm'];

function eventCrtFnt($scope, $log, $window, factory, comm){


    //CREER tous les Device associes au manager donné
    var devices = [
    {
      "id": 0,
      "type": "desktop",
      "orientation": "paysage",
      "longueur": 1256,
      "hauteur": 3256,
      "latitude": 3.14957,
      "longitude": 4.12457,
      "template": 1
    },
    {
      "id": 1,
      "type": "television",
      "orientation": "paysage",
      "longueur": 2023,
      "hauteur": 1451,
      "latitude": 43.5353,
      "longitude": 41.12457,
      "template": 2
    },
    {
      "id": 2,
      "type": "smartphone",
      "orientation": "portrait",
      "longueur": 345,
      "hauteur": 555,
      "latitude": 9.1458,
      "longitude": 3.14957,
      "template": 2
    },
    {
      "id": 3,
      "type": "tablet",
      "orientation": "portrait",
      "longueur": 1522,
      "hauteur": 887,
      "latitude": 192.1458,
      "longitude": 178.14957,
      "template": 1
    }
    ];

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

    $scope.id_screen = 0;

    $scope.selectCurrentDevice=function(deviceId){
      $scope.currentDevice=$scope.deviceMap.array[deviceId-1];

      var screen = comm.getScreen(id_manager, deviceId);
      screen.then(
        function(payload){
          $scope.currentDevice.template = payload[0].template;
          $scope.id_screen = payload[0].id; // TODOOOOOOOOOOOOOOOOOOO
        },
        function(errorPayload){
          $log.error('failure loading template', errorPayload);
        });

      /*var contents=comm.loadContent(deviceId);
      contents.then(
        function(payload) { 
          $scope.currentDevice.template = payload[0].template;
        },
        function(errorPayload) {
          $log.error('failure loading template', errorPayload);
        });*/

    }
    
    
  };
