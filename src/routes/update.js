const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const ZonaSchema = require('../models/Zona');

router.get('/update', async (req, res) => {
	const zonas = await ZonaSchema.find();
	const devices = await DeviceGPS.find();
	res.render('update', {zonas, devices});
});

module.exports = router;
