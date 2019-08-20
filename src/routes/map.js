const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const tools = require('../helpers/tools');

router.post('/map', async (req, res) => {
	var device = await DeviceGPS.findById('d111');
	var positions = device.position;
	var position = tools.getLastPosition(positions);

	res.render('map',{lat:position.lat,lng:position.lng});
});

module.exports = router;