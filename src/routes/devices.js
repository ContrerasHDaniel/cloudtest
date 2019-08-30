const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const HandleBars = require('handlebars');

router.get('/devices', (req, res) => {
	res.render('devices');
});

router.post('/devices/:id', async (req,res) => {
	const devices = await DeviceGPS.aggregate([
		{
			$match:{
				id_zona: req.params.id,
			}
		}
	]);
	
	res.send(devices);
});

module.exports = router;