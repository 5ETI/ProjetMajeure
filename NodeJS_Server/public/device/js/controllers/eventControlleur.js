angular.module('deviceApp').controller('eventCtrl',eventCrtFnt);
/*angular.module('deviceApp').directive('set-height', function() {
    return function (scope, element, attrs) {
      $log("rfeeg");
        element.height($(window).height());
    }
});*/
eventCrtFnt.$inject=['$scope','$log','$window','$sce','$interval', '$mdDialog','factory','comm', 'twitter'];

function eventCrtFnt($scope, $log, $window, $sce, $interval, $mdDialog, factory, comm, twitter){

 
  $scope.windowHeight = $window.innerHeight + 'px';

  $scope.deviceMap={};
  $scope.deviceMap.payload="";

  var isTwitterAccountSet = false;
  var inter = null;
  var tweetsList = [];
  $scope.LoadingAnim = true;

  var id_manager = 1; // TODO 1 is default manager id, get real manager id

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
    
    
    $scope.loadCurrentTweets = function() {
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
      };

      $scope.upload = function (){
        $scope.screen.contents[id_content].type = 2;
      }
};
