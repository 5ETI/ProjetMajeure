angular.module('deviceApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','$sce','$timeout','$interval', '$mdDialog','factory','comm', 'twitter', 'youtubeEmbedUtils', '$sessionStorage'];

function eventCrtFnt($scope, $log, $window, $sce, $timeout, $interval, $mdDialog, factory, comm, twitter, youtubeEmbedUtils, $sessionStorage){

  $scope.windowHeight = { height: $window.innerHeight + 'px' };
  $scope.windowHalfHeight = { height: $window.innerHeight/2 + 'px' };

  //option for youtube player
  $scope.playerVars = {
    controls: 0,
    disablekb: 1,
    showinfo: 0
  };

  $scope.deviceMap={};
  $scope.deviceMap.payload="";

  $scope.currentContent = {};

  $scope.id_screen = 0;
  $scope.screen = {};

  var inter = null;
  var tweetsList = [];
  $scope.LoadingAnim = true;

  var id_manager = 1;

  $sessionStorage.sync;
  //var id_device = $sessionStorage.user.id - 2;

  var available_device=comm.loadDevicesList(id_manager);
  available_device.then(
    function(payload) { 
      $scope.deviceMap.payload = payload;
      $scope.deviceMap.array=factory.mapToArray(payload);
    },
    function(errorPayload) {
      $log.error('failure loading devices', errorPayload);
    });


  $scope.setNbContent = function (nb){
    $scope.nbContent = nb;
  };


  $scope.selectCurrentDevice=function(){
    var deviceId = $sessionStorage.user.id - 2 ; //index db user
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
            $log.info("payload lentgh " + payload.length);
            $log.info("nbcontent " + $scope.nbContent );

            for(var i=0; i < $scope.nbContent ; i++){
              $scope.screen.contents[i] = {};
              $scope.screen.contents[i].type = 0;
              $scope.screen.contents[i].index = i;
              $scope.screen.contents[i].param1 = "";

              for(var j=0; j< payload.length ; j++){
                if(payload[j] != null && payload[j].index == i ){
                 $scope.screen.contents[i] = payload[j];
                 $scope.currentContent[j] = payload[j];
                };
              };

            };

            for(var i=0; i< $scope.screen.contents.length ; i++){
              if($scope.screen.contents[i].type == 4){ // twitter
                loadTweets($scope.screen.contents[i].param1);
              }
              if($scope.screen.contents[i].type == 5){ // youtube
                $scope.$on('youtube.player.ready', function ($event, player) {
                    // play it again
                    player.playVideo();
                  });
                $scope.$on('youtube.player.ended', function ($event, player) {
                    // play it again
                    player.playVideo();
                  });
              }  
            }
      },
      function(errorPayload) {
        $log.error('failure loading content', errorPayload);
      });
    }
  };

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

  var checkContent = function(){
    var myContents=comm.loadContent($scope.id_screen);
        myContents.then(
          function(payload) { 
            for(var i = 0; i < $scope.nbContent ; i++){
              /*$log.info(i + ">>>>>>>>>");
              $log.info("Payload[i]:");
              $log.info(payload[i]);
              $log.info("currentContent[i]:");
              $log.info($scope.currentContent[i]);
              $log.info("<<<<<<<<<<<<");*/
              if($scope.currentContent[i].type != payload[i].type || $scope.currentContent[i].index != payload[i].index || $scope.currentContent[i].param1 != payload[i].param1){
                $log.info("RELOAD CONTENT");
                $timeout($scope.selectCurrentDevice);
              }
            }
        },
        function(errorPayload) {
          $log.error('failure loading content', errorPayload);
        });
  };
  $timeout($scope.selectCurrentDevice,1000);
  $interval(checkContent,10000);
};
