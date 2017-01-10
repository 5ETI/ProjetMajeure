angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','$sce','$interval','factory','comm', 'twitter', '$mdDialog'];

function eventCrtFnt($scope, $log, $window, $sce, $interval, factory, comm, twitter,$mdDialog){


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
    $scope.screen = {};
    //$scope.contents = [];

    $scope.selectCurrentDevice=function(deviceId){
      $scope.currentDevice=$scope.deviceMap.array[deviceId-1];

      var screen = comm.getScreen(id_manager, deviceId);
      screen.then(
        function(payload){
          //log.info('screen ', payload);
          $scope.currentDevice.template = payload[0].template;
          $scope.id_screen = payload[0].id;
          $scope.screen.empty = payload[0].empty;
          if(!$scope.screen.empty){
            loadContent();
          }
        },
        function(errorPayload){
          $log.error('failure loading screen', errorPayload);
        });


      var loadContent = function(){
        if(!$scope.screen.empty){
          var contents=comm.loadContent($scope.id_screen);
          contents.then(
            function(payload) { 
                $scope.screen.contents = payload;
              },
              function(errorPayload) {
                $log.error('failure loading content', errorPayload);
              });
        }
      }


    }
    
    $scope.addNewTweet = function() {

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .textContent('Please enter the name of the twitter account from which you want to load tweets')
            .placeholder('Twitter Account name')
            .ariaLabel('accountName')
            .initialValue("Your brand's Name")
            //.targetEvent(ev)
            .ok('Add Tweets!')
            .cancel('cancel')
        // You can specify either sting with query selector
            .openFrom('left')
        // or an element
            .closeTo(angular.element(document.querySelector('#right')));

        $mdDialog.show(confirm).then(function(result) {
            //$scope.status = 'You decided to name your dog ' + result + '.';
            var available_tweets=twitter.loadTweets(result, 10);
            available_tweets.then(
                function(payload) {
                    var i = 0, len = payload.length;
                    var updateTweet = function(){
                        if (i>=len-1){
                            i=0;
                        }
                        i+=1;
                        var item = {"html": payload[i].html};
                        $scope.EmbedTweet = $sce.trustAsHtml(item.html);

                    };
                    $interval(updateTweet, 5000);
                });
        }, function() {
            $scope.status = 'You didn\'t name your dog.';
        });






      };

    
  };
