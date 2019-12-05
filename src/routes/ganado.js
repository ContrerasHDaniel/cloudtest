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
            ganado = getLastLatLng(ganado);
            res.render('ganado', {ganado});
        }
    });
});


// Modifica el arreglo de posiciones para dejar solamente la última posición conocida del dispositivo.
function getLastLatLng(ganado){
	// Se mapea el documento devices, obtenido por la consulta para poder realizar operaciones como si fuera un arreglo.
	ganado.map(function(vaca){
		// Se obtienen las últimas coordenadas en el arreglo position y se almacenan en variables temporales.
		var lat = vaca.position[vaca.position.length -1 ].lat;	
		var lng = vaca.position[vaca.position.length -1 ].lng;
		// Se borran las demás coordenadas contenidas en el arreglo position.
		vaca.position = [];
		// Se escriben en el arreglo position las últimas coordenadas.
		vaca.position = {lat: lat, lng: lng};
		return vaca; 
	});
	// Se regresa el objeto modificado.
	return ganado;
}

router.put('/ganado', isAuthenticated, async (req, res) => {
    var {id, alias, sex, weight, age, breed, type, vaccs, calf, iron, details} = req.body;
    try {
        const vaca = await Ganado.findByIdAndUpdate(id, 
            {
                $set: {
                    alias: alias,
                    sex: sex,
                    weight: weight,
                    age: age,
                    breed: breed,
                    type: type,
                    vaccs: vaccs,
                    calf: calf,
                    iron: iron,
                    details: details
                }
            });
            res.sendStatus(200);
    } catch (err){
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;