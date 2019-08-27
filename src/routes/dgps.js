const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');

router.post('/devices/dgps', async (req, res) => {    
    const {_id, id_ganado, nombre, id_zona, lat, lng, carga } = req.body;
    try{
        const newReg = new DeviceGPS(
            {
                _id:_id, 
                id_ganado: id_ganado, 
                nombre:nombre, 
                id_zona: id_zona, 
                position:{_id: Date.now(), lat:lat,lng:lng}, 
                carga:carga
            }
        );
        await newReg.save(async function (err) {
            if (err){
                const device = await DeviceGPS.findByIdAndUpdate(_id, {$push: 
                    {
                        position:{_id: Date.now(), lat:lat, lng:lng},
                    },
                    carga: carga
                });
                res.sendStatus(200);
            }else{
                res.sendStatus(201);
            }
        });
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;