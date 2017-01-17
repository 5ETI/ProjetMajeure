/**
 * Created by maxime on 12/01/17.
 */


"use strict";
//var cookie = require()
//var DeviceModel=require("./../models/device.model.js");






var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var AuthController = require("./../controllers/auth.controller.js");

router.route("/auth")
    .post(function (request, response) {
        AuthController.authentificate(request.body, function(err, resp){
            if (err){
                console.error(err);
                return response.status(500, err);
            }
            else{
                //console.log(resp);
                //console.log(resp);
                //response.clearCookie('name');
                //response.clearCookie('token');
                return response.json(resp);
            }
        });
    });