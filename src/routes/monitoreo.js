const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const ZonaSchema = require('../models/Zona');
const Ganado = require('../models/Ganado');

router.get('/monitoreo', async(req, res) =>{
    const zonas = await ZonaSchema.find().exec(function(err,zonas){
        if (err) {
            res.sendStatus(500);
        }else{
            res.render('monitoreo', {
                zonas, 
                lat: zonas[0].zone_lat, 
                lng: zonas[0].zone_lng }
            );
        }
    });
});

router.post('/monitoreo', async (req, res) => {
    const ganado = await Ganado.aggregate([
        {
            $match: {
                zone_id: req.body.zone_id,
            }
        },
        {
            $lookup : {
                from: "devicegps",
                localField: "device_id",
                foreignField: "_id",
                as: "device"
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{
                        $arrayElemAt: ["$device", 0]
                    }, "$$ROOT"]
                }
            }
        },
        {
            $project: {
                device: 0
            }
        }
    ]).exec(function (err, ganado) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(ganado);
        }
    });
});

module.exports = router;