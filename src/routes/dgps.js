const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');

router.post('/devices/dgps', async (req, res) => {    
    const {_id, name, group_id, lat, lng } = req.body;
    try{
        const newReg = new DeviceGPS({_id:_id, name:name, group_id:group_id, position:{_id: Date.now(), lat:lat,lng:lng}});
        await newReg.save();
        res.sendStatus(201);
    }catch(error){
        const device = await DeviceGPS.findByIdAndUpdate(_id, {$push: {position:{_id: Date.now(), lat:lat, lng:lng}}});
        console.log('update');
        res.sendStatus(200);
    }
});

module.exports = router;