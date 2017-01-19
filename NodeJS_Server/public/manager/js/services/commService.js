angular.module('commService', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q', 'factory', '$log', '$sessionStorage'];

function commFnc($http, $q, factory,$log, $sessionStorage){

    //delete $http.defaults.headers.common['X-Requested-With'];
        var comm = {
            loadDevicesList: loadDevicesList, 
            //loadTemplate: loadTemplate,
            getScreen: getScreen,
            loadContent: loadContent,
            deleteContent: deleteContent,
            saveScreen: saveScreen,
            setTemplate: setTemplate
        };


  /*  $http({
        method: 'GET',
        url: '/device/manager/'+ id_manager,
        headers: {'Authorization': $sessionStorage.token}
    }).success(function(data){
        // With the data succesfully returned, call our callback
        callbackFunc(data);
    }).error(function(){
        alert("error");
    });*/
       // FOR HTTP REQUEST
    function loadDevicesList(id_manager){
        var deferred = $q.defer();
        //$log.info ($sessionStorage.user.token);
        //delete $http.defaults.headers.common['X-Requested-With'];
        //$http.defaults.headers.common['name'] = $sessionStorage.user.name;
        $http.defaults.headers.common['token'] = $sessionStorage.user.token;

        $log.info ($http.defaults.headers.common);
        $http({
            method: 'GET',
            url: '/device/manager/'+ id_manager
        })
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    };

    function getScreen(id_manager,id_device){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/screen/'+ id_manager + '/'+id_device
            //headers: {'Authorization': $sessionStorage.token}
        })
        //$http.get('/screen/'+ id_manager + '/'+id_device, config)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    };

   function loadContent(id_screen){
       $http.defaults.headers.common['token'] = $sessionStorage.user.token;

       var deferred = $q.defer();
       $http({
           method: 'GET',
           url: '/content/'+ id_screen
           //headers: {'Authorization': $sessionStorage.token}
       })
        //$http.get('/content/'+ id_screen, config)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    };

    function deleteContent(id_screen){
        var deferred = $q.defer();
        $http.get('/content/delete/'+ id_screen)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    }

    function setTemplate(id_screen, id_template){
        var deferred = $q.defer();
        $http.get('/screen/setTemplate/'+ id_screen + '/' + id_template)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    }

    function saveScreen(id_screen, contents){
        var deferred = $q.defer();
        $http.post('/content/save/'+ id_screen, contents)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    }

    return comm;
};