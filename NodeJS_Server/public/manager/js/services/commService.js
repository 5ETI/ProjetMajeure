angular.module('commService', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q', 'factory', '$log', '$sessionStorage'];

function commFnc($http, $q, factory,$log, $sessionStorage){

    //delete $http.defaults.headers.common['X-Requested-With'];
        var comm = {
            loadDevicesList: loadDevicesList, 
            loadDevice: loadDevice,
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