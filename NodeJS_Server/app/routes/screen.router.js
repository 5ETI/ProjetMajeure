"use strict";


//var DeviceModel=require("./../models/device.model.js");
var  express  =  require("express");
var app = express();
var bodyParser = require('body-parser');
var  router  =  express.Router();
module.exports  =  router;
var ScreenController = require("./../controllers/screen.controller.js");
var utils = require("../utils/utils.js");
var multer  = require('multer');
var path = require("path");
var fs = require('fs');

var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
		  cb(null, 'public/manager/uploads/');
	  },
	  filename: function (req, file, cb) {
		  console.log("file: " + JSON.stringify(file));
		  cb(null, utils.generateUUID()+ path.extname(file.originalname));
	  }
});

var upload = multer({ storage: storage });


router.route('/upload')
.post( upload.single('image'), uploadImage);

function uploadImage(req, res) {

	var image = req.file;

	var originalname = image.originalname;
	var filename = image.filename;
	var path = image.path;
	var destination = image.destination;
	var size = image.size;
	var mimetype = image.mimetype;

	console.log("id_content : " + req.body.id_content);

	var contents = [];
	contents[0] = {};
	contents[0].type = 2;
	contents[0].index = req.body.id_content;
	contents[0].param1 = filename;

	ScreenController.saveContents(req.body.id_screen, contents, function(err, resp){
		if(err){
			console.error(response.status(500).end);
			return res.status(500).end;
		}
		else{
			console.log(resp);
			return res.json(resp);
		}
	});
}

router.route("/screen/:id_manager/:id_device")
.get(function(request, response) {
	var params = request.url.split("/");
	var id_manager = params[2];
	var id_device = params[3];
	ScreenController.getScreen(id_manager, id_device, function(err, id_screen){
		if(err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			console.log(id_screen);
			response.json(id_screen);
		}

	});
});

router.route("/screen/setTemplate/:id_screen/:id_template")
.get(function(request, response) {
	var params = request.url.split("/");
	var id_screen = params[3];
	var id_template = params[4];
	ScreenController.setTemplate(id_screen, id_template, function(err, id_screen){
		if(err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			console.log(id_screen);
			response.json(id_screen);
		}

	});
});


router.route("/content/:id_screen")
.get(function(request, response) {
	var params = request.url.split("/");
	var id_screen = params[2];
	ScreenController.getContent(id_screen, function(err, content){
		if(err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			console.log(content);
			return response.json(content);
		}

	});
});


router.route("/content/delete/:id_screen")
.get(function(request, response) {
	var params = request.url.split("/");
	var id_screen = params[3];

	ScreenController.getImagesId(function(err, resp){
		if(err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			// delete other images
			console.log(resp);
			removeUnreferencedImages(resp);
		}
	});

	ScreenController.deleteContent(id_screen, function(err, resp){
		if(err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			console.log(resp);
			return response.json(resp);
		}
	});

});

router.route("/content/save/:id_screen")
.post(function(request, response) {
	var params = request.url.split("/");
	var id_screen = params[3];
	var contents = request.body;

	ScreenController.saveContents(id_screen, contents, function(err, resp){
		if(err){
			console.error(response.status(500).end);
			return response.status(500).end;
		}
		else{
			console.log(resp);
			return response.json(resp);
		}
	});

});

var removeUnreferencedImages = function(imagesId){

	var path = "./public/manager/uploads";
	fs.readdirSync(path).forEach(function (file, index) {
		var toRemove = true;
		var curPath = path + "/" + file;

		for(var i = 0; i < imagesId.length ; i++){
			//console.log("imagesId[i] : " + imagesId[i].param1 + " // file : " + file);
			if(imagesId[i].param1 == file){
				toRemove == false;	
			}	
		};
		if(toRemove){
			fs.unlinkSync(curPath);
		}
	});
}


/*router.route("/screen/:id")
.get(function(request, response) {
	var params = request.url.split("/");
	var id = params[2];
	ScreenController.getScreen(id, function(err, screen){
		if(err){
			console.error(response.statut(500).end);
			return response.statut(500).end;
		}
		else{
			console.log(screen);
			response.json(screen);
		}

	});
});*/