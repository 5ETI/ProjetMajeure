/*var contentType={}
    contentType.IMG_URL="IMG_URL";
    contentType.IMG_B64="IMG_B64";
    contentType.URL="URL";
    contentType.VIDEO_YOUTUBE="VIDEO_YOUTUBE";
    contentType.VIDEO_CUSTOM="VIDEO_CUSTOM";
*/

angular.module('factoryService', []).factory('factory',factoryFnc);

function factoryFnc(){
     var factory = {
        generateUUID:       generateUUID,
        contentCreation:   contentCreation,
        screenCreation:      screenCreation,
        deviceCreation: deviceCreation,
        mapToArray:        mapToArray
         
     };
    
    
    //*********************************************//
    //************** INTERNAL TOOLS  **************//
    //*********************************************//
    
    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)      {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
     };
    
    
    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//
     
     function contentCreation(title,type,src){
       /* var content={};
        content.id=generateUUID();
        content.title=title;
        content.src=src; //'./img/no-image.jpg' //src
        content.type=type;
        return content;*/
     };
    
    
     function deviceCreation(id,type,orientation,latitude,longitude,hauteur,longueur,template){
        var device={};
        device.id=id;
        device.type=type;
        device.orientation=orientation;
        device.latitude=latitude;
        device.longitude=longitude;
        device.hauteur=hauteur;
        device.longueur=longueur;
        device.template=template;
        return device;
     };
    
    
     function screenCreation(title,description){
        /*var presentation={};
        presentation.id=generateUUID();
        presentation.title=title;
        presentation.description=description;
        presentation.slidArray=[];
        return presentation;*/
     };
   
    
    function mapToArray(map){
       contentArray=[];
        for(key in map){
            contentArray.push(map[key]);
        }
        return contentArray;
    };
    
   return factory;
};
    