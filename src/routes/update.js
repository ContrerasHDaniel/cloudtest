const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const ZonaSchema = require('../models/Zona');

router.get('/update', async (req, res) => {
	const zonas = await ZonaSchema.find();
	const devices = await DeviceGPS.find();
	res.render('update', {zonas, devices});
});

router.get('/update/edit/:id', async (req,res) => {
	const reg = await DeviceGPS.findById(req.params.id);
	const zona = await ZonaSchema.findById(reg.id_zona);
	res.render('edit', {reg,zona});
})

module.exports = router;
