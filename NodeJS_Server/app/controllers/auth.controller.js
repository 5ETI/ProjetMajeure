/**
 * Created by maxime on 12/01/17.
 */


'use strict';

var CONFIG = require("./../../config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var DAOAuth = require("./../DAO/DAOAuth.js");
var jwt = require('jsonwebtoken');
var utils = require("./../utils/utils.js");


var authentificate = function(userJson, response){
    DAOAuth.authentificate(userJson, function(err, resp){
        if(err)
        {
            console.log(err);
            return response(err);
        }
        else{
            //Here generate token and add it to response
            var token = jwt.sign(resp, 'adPanelKey');
            console.log(token);

            var JSONback = {
                "email": resp.email,
                "name": resp.name,
                "role":resp.role,
                "token":token
            };

            //var decoded = jwt.verify(token, 'secrettttttttttt');
            //console.log(decoded.email) // bar

            utils.addToken(resp.name,token);

            console.log(JSONback);
            return response(null, JSONback);
        }
    });

};
module.exports.authentificate = authentificate;
