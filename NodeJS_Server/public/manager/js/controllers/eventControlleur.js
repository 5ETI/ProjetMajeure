angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','factory','comm'];

function eventCrtFnt($scope, $log, $window, factory, comm){
       
    //CREER tous les Device associes au manager donné
    var devices = [
          {
            "id": 0,
            "orientation": "portrait",
            "longueur": 1256,
            "hauteur": 3256,
            "latitude": 3.14957,
            "longitude": 4.12457
          },
          {
            "id": 1,
            "orientation": "paysage",
            "longueur": 1256,
            "hauteur": 3256,
            "latitude": 9.1458,
            "longitude": 3.14957
          }
        ];
    //$scope.currentDevice=factory.deviceCreation("paysage","55.33","43.32","1024","340");
    //device0=factory.deviceCreation(devices[0].id,devices[0].orientation,devices[0].hauteur,devices[0].longueur,devices[0].longitude,devices[0].latitude);
    device1=factory.deviceCreation(devices[1].id,devices[1].orientation,devices[1].hauteur,devices[1].longueur,devices[1].longitude,devices[1].latitude);
    $scope.currentDevice=device1;
    //$scope.currentScreen=factory.screenCreation("template_pres","description of the template présentation");
    
   //CREATE an object for interactions with ng-include controller
   //$scope.contentMap={};
    //$scope.contentMap.payload="";
    
    $scope.deviceMap={};
    $scope.deviceMap.payload="";



    /*$scope.currentSlide="";
    */
    var available_device=comm.loadDevicesList();
       available_device.then(
          function(payload) { 
              $scope.deviceMap.payload = payload;
              $scope.deviceMap.array=factory.mapToArray(payload);
          },
          function(errorPayload) {
              $log.error('failure loading movie', errorPayload);
          });
    
      $scope.selectDevice = function(payload) { 
          $scope.deviceMap.payload= payload;             
          for(key in $scope.deviceMap.payload){
              $scope.currentDevice = $scope.deviceMap.payload[key];
          }  
        },
        function(errorPayload) {
          $log.error('failure loading movie', errorPayload);
        }

      var deviceCanvas=comm.loadDevice($scope.currentDevice.id,$scope.currentDevice.orientation,$scope.currentDevice.hauteur,$scope.currentDevice.longueur,$scope.currentDevice.longitude,$scope.currentDevice.latitude);
       deviceCanvas.then(
          function(payload) { 
              $scope.deviceMap.payload= payload;             
              for(key in $scope.deviceMap.payload){
                  $scope.currentDevice = $scope.deviceMap.payload[key];
              }
             
          },
          function(errorPayload) {
              $log.error('failure loading movie', errorPayload);
          });
    
    
    /*$scope.newSlide=function(){
        var slid=factory.slidCreation("slide-Title","slide-text");
        slid.contentMap[1]=10;
        //MODIFETIENNE 
        // var contentSlid = factory.contentCreation('title','type','./img/no-image.jpg')
        // slid.contentMap = factory.mapToArray(slid.contentMap);
        // slid.contentMap.push(contentSlid);

        $scope.currentPresentation.slidArray.push(slid);

        //MODIFETIENNE
        $scope.currentSlide=slid;
        
    }
    
    $scope.savePres=function(){
        comm.savePres($scope.currentPresentation);
        $log.info('selectCurrentSlid ID', $scope.currentPresentation);
        $log.info('Scope Event Controller => Slide ID', $scope.currentSlide.id);

    }
    
    $scope.selectCurrentSlid=function(slide){
        $scope.currentSlide=slide;
    }
    
    
    $scope.onDragComplete=function(data,evt){
       console.log("drag success, data:", data);
    }
    
    
    $scope.onDropComplete=function(data,evt){
        if($scope.currentSlide != undefined){
            $scope.currentSlide.contentMap[1]=data.id;
            //needed to inform angular that a change occurred on the current variable, this fire an event change
             $scope.$apply()
            console.log("drop success, data:", data);
            }
    }
    
    $scope.getCurrentDevice=function(){
        if(1  in  $scope.currentDevice.contentMap){
            return $scope.currentDevice.contentMap[1];
        }
    }
    
    $scope.isSlidContentEmpty=function(slid){
        if(slid.contentMap[1]== undefined){
            return true;
        }
        return false
    }    
    

    /*$scope.$watch("currentSlide", function(newVal, oldVal) {
        console.log(">>>>>>>>>");
        //console.dir(newVal);
        console.log('new Title = ',newVal.title);

        console.log(">>>>>>>>>");
        // console.dir(oldVal);
        console.log('old Title = ',oldVal.title);
    }); */
    
    
};
