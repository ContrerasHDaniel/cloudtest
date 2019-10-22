const express = require('express');
const router = express.Router();
const Ganado = require('../models/Ganado');
const { isAuthenticated }  = require('../helpers/auth');

router.get('/ganado', async (req, res) => {
    const ganado = await Ganado.aggregate([
        {
           $lookup: {
              from: "devicegps",
              localField: "device_id",    // field in the ganado collection
              foreignField: "_id",  // field in the devicegps collection
              as: "device"
           }
        },
        {
           $replaceRoot: { 
               newRoot: { 
                   $mergeObjects: [{ 
                       $arrayElemAt: [ "$device", 0 ] 
                    }, "$$ROOT" ]
                } 
            }
        },
        { 
            $project: { 
                device: 0 
            } 
        },
        {
            $lookup: {
                from: "zonas",
                localField: "zone_id",
                foreignField: "_id",
                as: "zone"
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects:[{
                        $arrayElemAt: ["$zone", 0]
                    }, "$$ROOT"]
                }
            }
        },
        {
            $project: {
                zone: 0
            }
        }
     ]).exec(function(err, ganado){
        if (err) {
            res.sendStatus(500);
        } else {
            res.render('ganado', {ganado});
        }
    });
});

module.exports = router;