const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const ZonaSchema = require('../models/Zona');
const Ganado = require('../models/Ganado');

/* Ruta de la página monitoreo, se dibuja la página y el mapa */
router.get('/monitoreo', async(req, res) =>{
    // Se consultan las zonas registradas en la base de datos
    const zonas = await ZonaSchema.find().exec(function(err,zonas){
        if (err) {
            // Si ocurre algún error se envía un estatus 500
            res.sendStatus(500);
        }else{
            // Si no ocurre un error se dibuja la página
            // y se pasa un json con la info por zona y una posición de centralización del mapa
            res.render('monitoreo', {
                zonas, 
                lat: zonas[0].zone_lat, 
                lng: zonas[0].zone_lng }
            );
        }
    });
});

/* Ruta para obtener los dispositivos relacionados a una zona */
router.post('/monitoreo', async (req, res) => {
    // Se realiza la consulta del ganado que coincida con el id de zona recibido
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
            // Si sucede un error se envía el estatus 500
            res.sendStatus(500);
        } else {
            // Si no hay errores, se envía un json con la info del ganado relacionado a la zona
            res.json(ganado);
        }
    });
});

module.exports = router;