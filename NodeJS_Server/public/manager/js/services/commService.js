angular.module('commService', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q', 'factory'];

function commFnc($http, $q, factory){

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
        ];

        var comm = {
            loadDevicesList: loadDevicesList, 
            loadDevice: loadDevice,
            loadTemplate: loadTemplate
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

    function loadTemplate(deviceId){
        var deferred = $q.defer();
        $http.get('/screen/'+ deviceId)
        .then(function successCallback(response) {
            return deferred.resolve(response.data);
        }, function errorCallback(response) {
            return deferred.reject(response.status);
        });
        return deferred.promise;
    }


    function loadDevice(deviceId,deviceType,deviceOrientation,deviceHauteur,deviceLongueur,deviceLongitude,deviceLatitude){
        var device1 = {};
        device1.id = deviceId;
        device1.type = deviceType;
        device1.orientation = deviceOrientation;
        device1.hauteur = deviceHauteur;
        device1.longueur = deviceLongueur;
        device1.longitude = deviceLongitude;
        device1.latitude = deviceLatitude;

        /*var presentation2 = {};
        presentation2.id='2';
        presentation2.title='title2';
        presentation2.description='description2';
        presentation2.slidArray=[];*/

        var deviceMap = {};

        deviceMap[device1.id] = device1;
        //presMap[presentation1.title] = presentation2;
        var deferred = $q.defer();  
        deferred.resolve(deviceMap);
        return deferred.promise; 
    };

/*function loadDevice(deviceID,deviceHauteur,deviceLargeur,deviceLongitude,deviceLatitude){
        var device1 = {};
        device1.id = deviceID ;
        device1.hauteur = deviceHauteur;
        device1.largeur = deviceLargeur;
        device1.longitude = deviceLongitude;
        device1.latitude = deviceLatitude;

        /*var presentation2 = {};
        presentation2.id='2';
        presentation2.title='title2';
        presentation2.description='description2';
        presentation2.slidArray=[];*/

        /*var deviceMap = {};

        deviceMap[device1.id] = device1;
        //presMap[presentation1.title] = presentation2;

        var deferred = $q.defer();
        $http.get('/device/all').
            success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(status);
                 // or server returns response with an error status.
            });
                return deferred.promise;
        };
        
        /*setInterval(function (deviceID) {          
               deferred.resolve(deviceMap);
               clearInterval(this); 
       },3000,deviceID);
        return deferred.promise; 
};


  /*comm.io = {};
    comm.io.socketConnection=function(scope,uuid){
        var socket = io.connect();
        comm.io.uuid=uuid;
        socket.on('connection', function () {
            socket.emit('data_comm',{'id':comm.io.uuid});
        });
        socket.on('newPres', function (socket) {
        });
        socket.on('slidEvent', function (socket) {
        });
        return socket;
    }
    comm.io.emitPrev=function(socket){
        socket.emit('slidEvent', {'CMD':"PREV"});
    }
    comm.io.emitNext=function(socket){
        socket.emit('slidEvent', {'CMD':"NEXT"});
    }
    comm.io.emitStart=function(socket,presUUID){
        socket.emit('slidEvent', {'CMD':"START",'PRES_ID':presUUID});
    }
    comm.io.emitPause=function(socket){
        socket.emit('slidEvent', {'CMD':"PAUSE"});
    }
    comm.io.emitBegin=function(socket){
        socket.emit('slidEvent', {'CMD':"BEGIN"});
    }
    comm.io.emitEnd=function(socket){
        socket.emit('slidEvent', {'CMD':"END"});
    }*/

    return comm;
};