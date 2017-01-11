/**
 * Created by max on 11/01/17.
 */
angular.module('managerApp').controller('youtubeCtrl',youtubeCrtFnt);
youtubeCrtFnt.$inject=['$scope','$log', '$window','youtubeEmbedUtils','$mdDialog'];

function youtubeCrtFnt($scope, $log, $window, youtubeEmbedUtils,$mdDialog) {

    var isVideoSet = false;
    $scope.addNewYoutube  = function() {
        $log.info("in youtubeController");
        if (isVideoSet == false) {
            isVideoSet = true;
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .textContent('Please enter the youtube video link')
                .placeholder('youtube video link')
                .ok('Add video!')
                .cancel('cancel')
                // You can specify either sting with query selector
                .openFrom('left')
                // or an element
                .closeTo(angular.element(document.querySelector('#right')));

            $mdDialog.show(confirm).then(function (result) {

                // TODO Here send result to db to add twitter account to screen DB
                //$scope.LoadingAnim = false;
                $scope.video = youtubeEmbedUtils.getIdFromURL(result);//'sMKoNBRZM1M';
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
        }
        else{
            var confirm = $mdDialog.confirm()
                .textContent('Would you like to delete this video?')
                .ok('Please do it!')
                .cancel('cancel');

            $mdDialog.show(confirm).then(function() {
                isVideoSet = false;
                $scope.video = "";

            }, null);
        };

    };
}