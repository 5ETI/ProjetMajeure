angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$timeout', '$window','$sce','$sessionStorage', '$http', '$interval', '$mdDialog','factory','comm', 'twitter', 'youtubeEmbedUtils', 'Upload', '$timeout','$mdToast'];

function eventCrtFnt($scope, $log, $timeout, $window, $sce, $sessionStorage, $http, $interval, $mdDialog, factory, comm, twitter, youtubeEmbedUtils, Upload, $timeout, $mdToast) {

var templateChanged = false;
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

    $scope.deviceMap={};
    $scope.deviceMap.payload="";
    $scope.selectedIndex = null;


    $scope.id_screen = 0;
    $scope.screen = {};

    $sessionStorage.sync;

    $log.info ($sessionStorage.user);
    $http.defaults.headers['x-access-token'] = $sessionStorage.user.token;
    $log.info ($http.defaults.headers.common);

    $log.info("SESSION    ============  ", $sessionStorage.user);
    $scope.LoadingAnim = true;
    $scope.progressSave = true;
    var inter = null;
    var tweetsList = [];
    $scope.LoadingAnim = true;

    var id_manager = 1; // TODO 1 is default manager id, get real manager id

    $scope.closeToast = function() {
      $mdToast.hide();
    };

  var contentsChanged = false;
  $scope.deviceMap={};
  $scope.deviceMap.payload="";
  var imagesToUpload = [] ;
  $scope.selectedIndex = null;

  $scope.id_screen = 0;
  $scope.screen = {};

  $scope.LoadingAnim = true;
  $scope.progressSave = true;

  var id_manager = $sessionStorage.user.id; // TODO 1 is default manager id, get real manager id

  var available_device=comm.loadDevicesList(id_manager);
  available_device.then(
    function(payload) {
      $scope.deviceMap.payload = payload;
      $scope.deviceMap.array=factory.mapToArray(payload);
    },
    function(errorPayload) {
      $log.error('failure loading devices', errorPayload);
    });

    $scope.selectCurrentDevice=function(deviceId, $index){

        if($scope.currentDevice != null){
            if($scope.currentDevice.id != deviceId){
                if(contentsChanged){
                    var confirm = $mdDialog.confirm()
                        .title('You have unsaved changes, do you want to continue ?')
                        .textContent('Your will loose your changes if you continue')
                        .ariaLabel('Lucky day')
                        .ok('Continue')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function() {

                        selectDevice(deviceId, $index);
                        //$scope.status = 'You decided to get rid of your debt.';
                    }, function() {
                        //$scope.status = 'You decided to keep your debt.';
                    });
                }else{
                    selectDevice(deviceId, $index);
                }
            }
        }else{
            selectDevice(deviceId, $index);
        }


    };

    var selectDevice = function (deviceId, $index){

        $scope.currentDevice=$scope.deviceMap.array[deviceId-1];
        $scope.selectedIndex=$index;

        var screen = comm.getScreen(id_manager, deviceId);
        screen.then(
            function(payload){
                //log.info('screen ', payload);
                $scope.currentDevice.template = payload[0].template;
                $scope.id_screen = payload[0].id;
                $scope.nbContent = 3;
                contentsChanged = false;
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

        $log.info("payload " + JSON.stringify( payload) );

        for(var i=0; i< $scope.nbContent ; i++){
          $scope.screen.contents[i] = {};
          $scope.screen.contents[i].type = 0;
          $scope.screen.contents[i].index = i;
          $scope.screen.contents[i].param1 = "";

          for(var j=0; j< payload.length ; j++){
            if(payload[j] != null && payload[j].index == i ){
             $scope.screen.contents[i] = payload[j];
            }
          }
        }
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
                contentsChanged = true;

            }, function() {

            });
        }

    };

    $scope.edit = function(id_content){
      var confirm = $mdDialog.prompt()
      .title('Upload Image Url')
      .textContent('Please enter your image url')
      .placeholder('http://')
      .ariaLabel('url')
      .ok('Add Image')
      .cancel('Cancel');
      
      $mdDialog.show(confirm).then(function(result) {
            $scope.screen.contents[id_content].type = 1;
            $scope.screen.contents[id_content].param1 = result;
        }, function() {
            });
    };

    $scope.upload = function (id_content){
        $scope.screen.contents[id_content].type = 2;
    };


  /*$scope.upload = function (id_content, flow){
    $scope.screen.contents[id_content].type = 2;
    $log.info("flow: " + flow);
  };*/


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
    }
      var deleteContent = comm.deleteContent($scope.id_screen);
    deleteContent.then(
      function(payload){
          //log.info('screen ', payload);
          $log.info('delete success ');

          uploadImages();

          var save = comm.saveScreen($scope.id_screen, $scope.screen.contents);
          save.then(
            function(payload){
          //log.info('screen ', payload);

          $log.info('save success ');
          $timeout($scope.openToast);
          $scope.progressSave = true;
          contentsChanged = false;
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
                  contentsChanged = true;
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
            contentsChanged = true;
            clearContent();

        }, function() {

        });
    }
    
    var clearContent = function(){
          $log.info("clear, nbcontent " + $scope.nbContent );
          for(var i=0; i< $scope.nbContent ; i++){
            $scope.screen.contents[i] = {};
            $scope.screen.contents[i].type = 0;
            $scope.screen.contents[i].index = i;
            $scope.screen.contents[i].param1 = "";
          }
        };

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

        $scope.uploadImage = function(id_content, file, errFiles) {

          $scope.screen.contents[id_content].type = 2;
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];

        imagesToUpload[id_content] = {};
        if (file) {
          imagesToUpload[id_content] = file;
        }
        
    }
   
    var uploadImages = function(){
      for(var i=0; i< $scope.nbContent ; i++){
        if($scope.screen.contents[i].type == 2){
          if(imagesToUpload[i] != null){

            var file = imagesToUpload[i];
            file.upload = Upload.upload({
                url: '/upload',
                data: {image: file, id_content: i, id_screen: $scope.id_screen}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
          }
        }
      }
    };
}
