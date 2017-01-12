angular.module('deviceApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','$sce','$interval', '$mdDialog','factory','comm', 'twitter'];

function eventCrtFnt($scope, $log, $window, $sce, $interval, $mdDialog, factory, comm, twitter){

  $scope.windowHeight = { height: $window.innerHeight+ 'px' };
  $scope.windowHeightMiddle = { height: ($window.innerHeight/2) + 'px' };
  console.log($scope.windowHeight);

  $scope.deviceMap={};
  $scope.deviceMap.payload="";

  $scope.id_screen = 0;
  $scope.screen = {};

  var inter = null;
  var tweetsList = [];
  $scope.LoadingAnim = true;

  var id_manager = 1; // TODO 1 is default manager id, get real manager id
  //var deviceId = 3; // TODO 1 is default screen id, get real screen id

  var available_device=comm.loadDevicesList(id_manager);
  available_device.then(
    function(payload) { 
      $scope.deviceMap.payload = payload;
      $scope.deviceMap.array=factory.mapToArray(payload);
    },
    function(errorPayload) {
      $log.error('failure loading devices', errorPayload);
    });


  $scope.selectCurrentDevice=function(deviceId){
    $scope.currentDevice=$scope.deviceMap.array[deviceId-1];

    var screen = comm.getScreen(id_manager, deviceId);
    screen.then(  
      function(payload){
          //log.info('screen ', payload);
          $scope.currentDevice.template = payload[0].template;
          $scope.id_screen = payload[0].id;
          //$scope.screen.empty = payload[0].empty;
          //if(!$scope.screen.empty){
            loadContent();
          //}
        },
        function(errorPayload){
          $log.error('failure loading screen', errorPayload);
        });

    var loadContent = function(){
      //if(!$scope.screen.empty){
        var contents=comm.loadContent($scope.id_screen);
        contents.then(
          function(payload) { 

            $scope.screen.contents = [];
            $log.info("contents lentgh " + payload.length);

            for(var i=0; i< payload.length ; i++){
              var j = payload[i].index;
              $scope.screen.contents[j] = payload[i];
          }; 

            for(var i=0; i< $scope.screen.contents.length ; i++){
              if($scope.screen.contents[i].type == 4){ // twitter
              loadTweets($scope.screen.contents[i].param1);
          } 
        }
      },
      function(errorPayload) {
        $log.error('failure loading content', errorPayload);
      });
      //}
    }
  }

  $scope.upload = function (id_content){
    $scope.screen.contents[id_content].type = 2;
  };

  var loadTweets = function(twitter_account){
    $scope.LoadingAnim = false;

    $interval.cancel(inter);
    tweetsList = [];
    $scope.EmbedTweet = "";

    var available_tweets = twitter.loadTweets(twitter_account, 10);
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
          $scope.LoadingAnim = true;

        };
        inter = $interval(updateTweet, 5000);
      });
  };

  $scope.addNewTweet = function(id_content) {

   $interval.cancel(inter);
   tweetsList = [];
   $scope.EmbedTweet = "";
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
            .textContent('Please enter the name of the twitter account from which you want to load tweets')
            .placeholder('Twitter Account name')
                //.targetEvent(ev)
                .ok('Add Tweets!')
                .cancel('cancel')
                // You can specify either sting with query selector
                .openFrom('left')
                // or an element
                .closeTo(angular.element(document.querySelector('#right')));

                $mdDialog.show(confirm).then(function (result) {

                  $log.info("addNewTweet " + result);
                  $scope.screen.contents[id_content].type = 4;
                  $scope.screen.contents[id_content].param1 = result;
                  loadTweets(result);
                }, function () {
                  $scope.status = 'You didn\'t add a tweet';
                });

              };

            };
