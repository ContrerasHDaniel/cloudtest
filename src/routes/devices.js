const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');

router.get('/devices', (req, res) => {
	res.render('devices');
});

router.get('/devices/:id', async (req,res) => {
	const devices = await DeviceGPS.aggregate([
		{
			$match:{
				id_zona: req.params.id,
			}
		}
	]).exec(function(err,docs){
		docs = docs.map(function(doc){return doc; });
		if(err){
			res.json(err);
		}else{
			res.json(docs);
		}
	});
});

module.exports = router;