const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');

router.get('/devices', async (req, res) => {
	const devices = await DeviceGPS.find();
	console.log(typeof devices);
	res.render('devices',{devices});
});

router.get('/devices/:id', async (req,res) => {
	const devices = await DeviceGPS.aggregate([
		{
			$match:{
				id_zona: req.params.id,
			}
		}
	]).exec(function(err,docs){
		docs = docs.map(function(doc){
					var lat = doc.position[doc.position.length -1 ].lat;
					var lng = doc.position[doc.position.length -1 ].lng;
					doc.position = [];
					doc.position = {lat: getLat(lat), lng: getLng(lng)};
					return doc; 
				});
		if(err){
			res.json(err);
		}else{
			res.json(docs);
		}
	});
});

function getLat(lat){
    var b = ".";
    var positionLat = 2;
    var outputLat = [lat.slice(0, positionLat), b, lat.slice(positionLat)].join('');
    return outputLat;
}
function getLng(lng){
    var b = ".";
    var positionLng = 4;
    var outputLng = [lng.slice(0, positionLng), b, lng.slice(positionLng)].join('');
    return outputLng;
}

module.exports = router;