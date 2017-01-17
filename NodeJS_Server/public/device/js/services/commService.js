angular.module('commService', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q', 'factory'];

function commFnc($http, $q, factory){
/*
        var devices = [
        {
            "id": 0,
            "type": "desktop",
            "orientation": "paysage",
            "longueur": 1256,
            "hauteur": 3256,
            "latitude": 3.14957,
            "longitude": 4.12457,
            "template": 1
        },
        {
            "id": 1,
            "type": "television",
            "orientation": "paysage",
            "longueur": 2023,
            "hauteur": 1451,
            "latitude": 43.5353,
            "longitude": 41.12457,
            "template": 2
        },
        {
            "id": 2,
            "type": "smartphone",
            "orientation": "portrait",
            "longueur": 345,
            "hauteur": 555,
            "latitude": 9.1458,
            "longitude": 3.14957,
            "template": 3
        },
        {
            "id": 3,
            "type": "tablet",
            "orientation": "portrait",
            "longueur": 1522,
            "hauteur": 887,
            "latitude": 192.1458,
            "longitude": 178.14957,
            "template": 4
        }
        ];*/

        var comm = {
            loadDevicesList: loadDevicesList, 
            loadDevice: loadDevice,
            //loadTemplate: loadTemplate,
            getScreen: getScreen,
            loadContent: loadContent
        };

       // FOR HTTP REQUEST
    function loadDevicesList(id_manager){
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

    function loadDevice(deviceId,deviceType,deviceOrientation,deviceHauteur,deviceLongueur,deviceLongitude,deviceLatitude){
        var device1 = {};
        device1.id = deviceId;
        device1.type = deviceType;
        device1.orientation = deviceOrientation;
        device1.hauteur = deviceHauteur;
        device1.longueur = deviceLongueur;
        device1.longitude = deviceLongitude;
        device1.latitude = deviceLatitude;

        var deviceMap = {};

        deviceMap[device1.id] = device1;
        var deferred = $q.defer();  
        deferred.resolve(deviceMap);
        return deferred.promise; 
    };

    return comm;
};