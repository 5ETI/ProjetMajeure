angular.module('commService', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q', 'factory'];

function commFnc($http, $q, factory){


        /*var content0 = {};
        content0 = factory.contentCreation('myImg0','IMG_B64','./img/0.jpg');
        content0.id = 10; 

        var content1 = {};
        content1= factory.contentCreation('myImg1','IMG_URL','./img/1.jpg');
        var content2 = {};
        content2= factory.contentCreation('myImg2','IMG_URL','./img/2.jpg');
        var content3 = {};
        content3= factory.contentCreation('myImg3','IMG_URL','./img/3.jpg');
        var content4 = {};
        content4= factory.contentCreation('myImg4','IMG_URL','./img/4.jpg');
        var content5 = {};
        content5= factory.contentCreation('myImg5','IMG_URL','./img/5.jpg');
        var content6 = {};
        content6= factory.contentCreation('myImg6','IMG_URL','./img/6.jpg');
        var content7 = {};
        content7= factory.contentCreation('myImg7','IMG_URL','./img/7.jpg');
        var content8 = {};
        content8= factory.contentCreation('myImg8','IMG_B64','./img/8.jpg');
        var content9 = {};
        content9= factory.contentCreation('myImg9','IMG_URL','./img/9.jpg');
        var content10 = {};
        content10= factory.contentCreation('myImg10','IMG_URL','./img/10.jpg');

        var imageMap = {};
        imageMap[content0.id] = content0;
        imageMap[content1.id] = content1;
        imageMap[content2.id] = content2;
        imageMap[content3.id] = content3;
        imageMap[content4.id] = content4;
        imageMap[content5.id] = content5;
        imageMap[content6.id] = content6;
        imageMap[content7.id] = content7;
        imageMap[content8.id] = content8;
        imageMap[content9.id] = content9;
        imageMap[content10.id] = content10;*/
        var devices = [
          {
            "id": 0,
            "orientation": "portrait",
            "longueur": 1256,
            "hauteur": 3256,
            "latitude": 3.14957,
            "longitude": 4.12457
          },
          {
            "id": 1,
            "orientation": "paysage",
            "longueur": 345,
            "hauteur": 555,
            "latitude": 9.1458,
            "longitude": 3.14957
          }
        ];

        var comm = {
            loadDevicesList: loadDevicesList, 
            loadDevice: loadDevice
        };

       // FOR HTTP REQUEST
       function loadDevicesList(deviceId){
        var deferred = $q.defer();
        deferred.resolve(devices);
        return deferred.promise;
        };

        /*function loadImages(presName,presID){
                var deferred = $q.defer();
                $http.get('/resources_list').
                success(function(data, status, headers, config) {
                        deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                       deferred.reject(status);
                 // or server returns response with an error status.
         });
                return deferred.promise;
        };

        /*function loadPres(presName,presID){
               var deferred = $q.defer();
               $http.get('/loadPres').
               success(function(data, status, headers, config) {
                       deferred.resolve(data);
               }).
               error(function(data, status, headers, config) {
                       deferred.reject(status);
                 // or server returns response with an error status.
         });
               return deferred.promise;
           }*/



        function loadDevice(deviceId,deviceOrientation,deviceHauteur,deviceLongueur,deviceLongitude,deviceLatitude){
            var device1 = {};
            device1.id = deviceId;
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