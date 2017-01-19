angular.module('commService', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q', 'factory', '$sessionStorage'];

function commFnc($http, $q, factory, $sessionStorage){

    $sessionStorage.sync;
    
        var comm = {
            loadDevicesList: loadDevicesList, 
            //loadTemplate: loadTemplate,
            getScreen: getScreen,
            loadContent: loadContent
        };

       // FOR HTTP REQUEST
    function loadDevicesList(id_manager){
        $http.defaults.headers.common['token'] = $sessionStorage.user.token;
        var deferred = $q.defer();
        $http.get('/device/manager/'+ id_manager)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    };

    function getScreen(id_manager,id_device){
        var deferred = $q.defer();
        $http.get('/screen/'+ id_manager + '/'+id_device)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    };

   function loadContent(id_screen){
        var deferred = $q.defer();
        $http.get('/content/'+ id_screen)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    };

    return comm;
};