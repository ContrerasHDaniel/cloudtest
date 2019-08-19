const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');

router.post('/dgps', async (req, res) => {    
    const { name, group_id, lat, lng } = req.body;
    //validacion

    const newReg = new DeviceGPS({name,group_id,lat,lng});
    await newReg.save();
    res.send('ok');

});

module.exports = router;