/**
 * Created by maxime on 12/01/17.
 */
'use strict';

var request = require('request');
//var DAO_Connection = require ("./DAO_Connection.js");

var users = [{
    "id": 1,
    "email": "manager@manager.com",
    "password": "manager",
    "name": "Manager",
    "role": "MANAGER",
    "timestamp": 1484214822000
},
    {
        "id": 1,
        "email": "admin@admin.com",
        "password": "admin",
        "name": "Admin",
        "role": "ADMIN",
        "timestamp": 1484214822000
    },
    {
        "id": 3,
        "email": "screen@screen.com",
        "password": "screen",
        "name": "Screen",
        "role": "SCREEN",
        "timestamp": 1484214822000
    }];


var authentificate = function(JsonUser, resp){
    var JSONresp ={};
    var email = JsonUser.email;
    var password = JsonUser.password;

    request.post(
        'http://localhost:8080/auth/rest/auth/',
        { json:  {email: JsonUser.email, password: JsonUser.password} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                return resp(null,body);
            }
        }
    );

    // If no wildfly use local users
    /*for (var i = 0 ; i<users.length-1; i++){
        if (email == users[i].email && password == users[i].password) {
            console.log("email et mdp ok");
            var JSONresp = users[i];
            return resp(null, JSONresp);
        }

    }*/
    //return resp("not in DB");


};
module.exports.authentificate = authentificate;

