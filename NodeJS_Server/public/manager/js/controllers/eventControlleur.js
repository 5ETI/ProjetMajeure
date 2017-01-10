angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','$sce','$interval','factory','comm', 'twitter', '$mdDialog'];

function eventCrtFnt($scope, $log, $window, $sce, $interval, factory, comm, twitter,$mdDialog){

    $scope.deviceMap={};
    $scope.deviceMap.payload="";

    var isTwitterAccountSet = false;
    var inter = null;
    var tweetsList = [];

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
          $log.info(payload[0]);
          $scope.currentDevice.template = payload[0].template;
        },
        function(errorPayload) {
          $log.error('failure loading template', errorPayload);
        });
    };
    
    $scope.addNewTweet = function() {

        if (isTwitterAccountSet == false) {
            isTwitterAccountSet = true;
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

            $mdDialog.show(confirm).then(function (result) {

                // TODO Here send result to db to add twitter account to screen DB
                //$scope.status = 'You decided to name your dog ' + result + '.';
                var available_tweets = twitter.loadTweets(result, 10);
                available_tweets.then(
                    function (payload) {
                        tweetsList = payload;
                        var i = 0, len = tweetsList.length;
                        var updateTweet = function () {
                            if (i >= len - 1) {
                                i = 0;
                            }
                            i += 1;
                            var item = {"html": tweetsList[i].html};
                            $scope.EmbedTweet = $sce.trustAsHtml(item.html);

                        };
                        inter = $interval(updateTweet, 5000);
                    });
            }, function () {
                $scope.status = 'You didn\'t add a tweet';
            });
        }
        else{
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    //.title('Would you like to delete your twitter account?')
                    .textContent('Would you like to delete your twitter account?')
                    .ariaLabel('Lucky day')
                    //.targetEvent(ev)
                    .ok('Please do it!')
                    .cancel('Sounds like a scam');

                $mdDialog.show(confirm).then(function() {
                    $interval.cancel(inter);
                    tweetsList = [];
                    isTwitterAccountSet = false;
                    $scope.status = 'You decided to get rid of your debt.';
                }, function() {
                    $scope.status = 'You decided to keep your debt.';
                });
            };

        };

    
  };
