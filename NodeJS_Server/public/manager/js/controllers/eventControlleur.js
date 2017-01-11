angular.module('managerApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','$sce','$interval', '$mdDialog','factory','comm', 'twitter'];

function eventCrtFnt($scope, $log, $window, $sce, $interval, $mdDialog, factory, comm, twitter){


    $scope.deviceMap={};
    $scope.deviceMap.payload="";

    $scope.id_screen = 0;
    $scope.screen = {};

    var inter = null;
    var tweetsList = [];
    $scope.LoadingAnim = true;

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


    $scope.remove = function(id_content){
        if($scope.screen.contents[id_content].type != 0){
            var confirm = $mdDialog.confirm()
                .textContent('Confirm delete this content')
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {

                if($scope.screen.contents[id_content].type == 4 ){
                    $interval.cancel(inter);
                    tweetsList = [];
                    $scope.EmbedTweet = "";
                }
                $scope.screen.contents[id_content].type = 0;
            }, function() {

            });
        }

    };

    $scope.edit = function(id_content){
        var confirm = $mdDialog.prompt()
            .textContent('Specify the picture url')
            .placeholder('url')
            .ariaLabel('url')
            .ok('Add Image')
            .cancel('cancel');

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

        $log.info("$scope.screen.id " + $scope.id_screen);
        $log.info(" $scope.screen.contents[0] " +  $scope.screen.contents[0]);

        var deleteContent = comm.deleteContent($scope.id_screen);
        deleteContent.then(
            function(payload){
                //log.info('screen ', payload);

                var save = comm.saveScreen($scope.id_screen, $scope.screen.contents);
                save.then(
                    function(payload){
                        //log.info('screen ', payload);
                        $log.info('success ');
                    },
                    function(errorPayload){
                        $log.error('failure saving screen', errorPayload);
                    });
            },
            function(errorPayload){
                $log.error('failure saving screen', errorPayload);
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