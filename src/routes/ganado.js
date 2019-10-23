const express = require('express');
const router = express.Router();
const Ganado = require('../models/Ganado');
const { isAuthenticated }  = require('../helpers/auth');

/* Ruta para dibujar la página 'Mi ganado' */
router.get('/ganado', isAuthenticated, async (req, res) => {
    // Se realiza la consulta a Ganado para obtener todos los animales [de un usuario dado]
    const ganado = await Ganado.aggregate([
        {
           $lookup: {
              from: "devicegps",
              localField: "device_id",    // campo en la colección ganado
              foreignField: "_id",  // campo en la colección devicegps
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
            // Si ocurre un error se envía el estatus 500
            res.sendStatus(500);
        } else {
            // Si no ocurre un error se dibuja la página 'ganado.hbs' y se envían los datos necesarios en el json 'ganados'
            res.render('ganado', {ganado});
        }
    });
});

module.exports = router;