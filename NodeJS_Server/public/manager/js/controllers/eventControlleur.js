angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

//eventCrtFnt.$inject=['$scope','$log','$window','$sce','$interval', '$mdDialog','factory','comm', 'twitter', 'youtubeEmbedUtils'];
eventCrtFnt.$inject=['$scope','$timeout','$log','$window','$sce','$interval', '$mdDialog','factory','comm', 'twitter', 'youtubeEmbedUtils','$mdToast'];

function eventCrtFnt($scope, $timeout,$log, $window, $sce, $interval, $mdDialog, factory, comm, twitter, youtubeEmbedUtils, $mdToast){

  $scope.canvasHeight = angular.element('#canvas').innerHeight();
  $scope.canvasHalfHeight = $scope.canvasHeight / 2;
  $scope.playerVars = {
    controls: 0,
    disablekb: 1,
    showinfo: 0
  };
  //$log.info(angular.element('#canvas').height());
  $scope.openToast = function($event) {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Your screen has been saved!')
        //.hideDelay(3000)
        .position('top right')
    );
    //$mdToast.showSimple('Screen Saved');
  };
  //TOAST CONTROLLEUR FUNCTIONS
  /*var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
      };

    $scope.toastPosition = angular.extend({},last);

    $scope.getToastPosition = function() {
      sanitizePosition();

      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;

      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;

      last = angular.extend({},current);
    }

    $scope.showSimpleToast = function() {
      var pinTo = $scope.getToastPosition();
      $mdToast.show(
        $mdToast.simple()
          .textContent('Screen Saved!')
          .position(pinTo )
          .hideDelay(3000)
      );
    };

    $scope.closeToast = function() {
      $mdToast.hide();
    };*/

  var IsYoutubeSet = false;
  var templateChanged = false;
  $scope.deviceMap={};
  $scope.deviceMap.payload="";
  $scope.selectedIndex = null;


  $scope.id_screen = 0;
  $scope.screen = {};

  var inter = null;
  var tweetsList = [];
  $scope.LoadingAnim = true;
  $scope.progressSave = true;

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

  $scope.selectCurrentDevice=function(deviceId,$index){
    $scope.currentDevice=$scope.deviceMap.array[deviceId-1];
    $scope.selectedIndex=$index;

    var screen = comm.getScreen(id_manager, deviceId);
    screen.then(  
      function(payload){
          //log.info('screen ', payload);
          $scope.currentDevice.template = payload[0].template;
          $scope.id_screen = payload[0].id;
          $scope.nbContent = 3;

            loadContent();
          
        },
        function(errorPayload){
          $log.error('failure loading screen', errorPayload);
        });

  };

  var loadContent = function(){

        var contents=comm.loadContent($scope.id_screen);
        contents.then(
          function(payload) { 

            $scope.screen.contents = [];
            $log.info("payload lentgh " + payload.length);
            $log.info("nbcontent " + $scope.nbContent );

            for(var i=0; i< $scope.nbContent ; i++){
              $scope.screen.contents[i] = {};
              $scope.screen.contents[i].type = 0;
              $scope.screen.contents[i].index = i;
              $scope.screen.contents[i].param1 = "";

              for(var j=0; j< payload.length ; j++){
                if(payload[j] != null && payload[j].index == i ){
                 $scope.screen.contents[i] = payload[j];
               };
             };

           };

           for(var i=0; i< $scope.screen.contents.length ; i++){
              if($scope.screen.contents[i].type == 4){ // twitter
                loadTweets($scope.screen.contents[i].param1);
              } 
              if($scope.screen.contents[i].type == 5){ // twitter
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
     
    };

    $scope.remove = function(id_content){
      if($scope.screen.contents[id_content].type != 0){
        var confirm = $mdDialog.confirm()
        .title('Delete Content')
        .textContent('Are you sure you want to delete this content ?')
        .ok('Delete')
        .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {

          if($scope.screen.contents[id_content].type == 4 ){
            $interval.cancel(inter);
            tweetsList = [];
            $scope.EmbedTweet = "";
          }
          $scope.screen.contents[id_content].type = 0;
          $scope.screen.contents[id_content].param1 = "";

        }, function() {

        });
      }

    };

    function dialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      $scope.change = function() {
        $scope.screen.contents[id_content].type = 1;
        $scope.screen.contents[id_content].param1 = $scope.inputUrl;
      };
    };

    /*var showDialogInput = function(url) {
    $mdDialog.show({
      controller: dialogController,
      templateUrl: url+'.html',
      parent: angular.element(document.body),
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(result) {
      $scope.screen.contents[id_content].type = 1;
      $scope.screen.contents[id_content].param1 = result;
      }, function() {

      });
  };*/

  $scope.edit = function(id_content){
      var confirm = $mdDialog.prompt()
      .title('Upload Image Url')
      .textContent('Please enter your image url')
      .placeholder('http://')
      .ariaLabel('url')
      .ok('Add Image')
      .cancel('Cancel');
      
      $mdDialog.show(confirm).then(function(result) {
            //$scope.status = 'You decided to name your dog ' + result + '.';
            $scope.screen.contents[id_content].type = 1;
            $scope.screen.contents[id_content].param1 = result;
          }, function() {

          });
  };

    $scope.upload = function (id_content){
      $scope.screen.contents[id_content].type = 2;
    };

    $scope.save = function(){

      $scope.progressSave = false;
      $log.info("$scope.screen.id " + $scope.id_screen);

      if(templateChanged){
        var saveTemplate = comm.setTemplate($scope.id_screen, $scope.currentDevice.template);
        saveTemplate.then(
          function(payload){
            $log.info('set template');
          },
          function(errorPayload){
            $log.info('error setting template');
          });
      };

      var deleteContent = comm.deleteContent($scope.id_screen);
      deleteContent.then(
        function(payload){
          //log.info('screen ', payload);
          $log.info('delete success ');

          var save = comm.saveScreen($scope.id_screen, $scope.screen.contents);
          save.then(
            function(payload){
          //log.info('screen ', payload);

          $log.info('save success ');
          $timeout($scope.openToast);
          $scope.progressSave = true;
        },
        function(errorPayload){
          $log.error('failure saving screen', errorPayload);
        });
        });
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
            .title('Upload Tweets')
            .textContent('Please enter the name of the twitter account from which you want to load tweets')
            .placeholder('Twitter Account name')
                //.targetEvent(ev)
                .ok('Upload')
                .cancel('Cancel')
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

        $scope.addNewYoutube = function (id_content) {
                if (IsYoutubeSet == false) {
                  IsYoutubeSet = true;
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
            .title('Upload Youtube Video')
            .textContent('Please enter your youtube link')
            .placeholder('http://')
            .ok('Upload')
            .cancel('Cancel')
                // You can specify either sting with query selector
                .openFrom('left')
                // or an element
                .closeTo(angular.element(document.querySelector('#right')));

                $mdDialog.show(confirm).then(function (result) {
                //$scope.LoadingAnim = false;
                $log.info(youtubeEmbedUtils.getIdFromURL(result));

                $scope.screen.contents[id_content].param1 = youtubeEmbedUtils.getIdFromURL(result);//'sMKoNBRZM1M';
                $log.info($scope.screen.contents[id_content].param1 );
                $scope.screen.contents[id_content].type = 5;
                $scope.$on('youtube.player.ready', function ($event, player) {
                    // play it again
                    player.playVideo();
                  });
                $scope.$on('youtube.player.ended', function ($event, player) {
                    // play it again
                    player.playVideo();
                  });
              }, function () {
                $scope.status = 'You didn\'t add a video';
              });

            // TODO here add content from youtubeController addNewYoutube and set $scope.screen.content

          }
        };

        $scope.changeTemplate = function(id_template){

          var confirm = $mdDialog.confirm()
          .title('Change Template')
          .textContent('Are you sure you want to switch to template '+id_template+' ?')
          .cancel('Cancel')
          .ok('Change');


          $mdDialog.show(confirm).then(function(result) {

            $scope.currentDevice.template = id_template;
            templateChanged = true;
            clearContent();

          }, function() {

          });
        }

    $scope.clearContents = function(){
      var confirm = $mdDialog.confirm()
          .title('Clear Screen')
          .textContent('Are you sure you want to clear your screen ?')
          .cancel('Cancel')
          .ok('Clear');


          $mdDialog.show(confirm).then(function(result) {
            clearContent();
          }, function() {

          });
    };

    var clearContent = function(){
      $log.info("clear, nbcontent " + $scope.nbContent );
      for(var i=0; i< $scope.nbContent ; i++){
              $scope.screen.contents[i] = {};
              $scope.screen.contents[i].type = 0;
              $scope.screen.contents[i].index = i;
              $scope.screen.contents[i].param1 = "";
            };
    };
};