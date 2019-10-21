const express = require('express');
const router = express.Router();
const ZonaSchema = require('../models/Zona');
const DeviceGPS = require('../models/DeviceGPS');
var admin = require("firebase-admin");
var serviceAccount = require("../public/gantrack-a58c4-firebase-adminsdk-4ihsd-c48084bb14.json");
var idZ = "";
var codG = "";

/* Ruta para registrar/actualizar un dispositivo GPS */
router.post('/devices/dgps', async (req, res) => {    				
	// Se obtienen todos los campos enviados por el dispositivo
	var {_id, id_ganado, nombre, id_zona, lat, lng, battery, alerta } = req.body;
	// TEMPORAL: Mientras el dispositivo no emita la batería restante se genera un número aleatorio para reemplazar el valor nulo recibido.
	if(battery=='null' || battery == null){
		battery = Math.floor((Math.random() * 10) + 90).toString();
	}
	
	// Bandera para obtener si un dispositivo disparó una alerta.
	alerts = alerta == 1 || alerta == "true";
	
	try{
		
		// Se crea un modelo mongoose de dispositivo para guardar/actualizar la base de datos.
        const newReg = new DeviceGPS(
            {
                _id:_id, 
                id_ganado: id_ganado, 
                nombre:nombre, 
                id_zona: id_zona, 
                position:{_id: Date.now(), lat:lat,lng:lng}, // De acuerdo al esquema interno de posicion.
                battery: battery,
                alerta: alerta
            }
		);

		// Intenta guardar en la base de datos el nuevo dispositivo
        await newReg.save(async function (err) {
			if (err){											// Se espera que el error sea el caso de que ya existe un dispositivo con ese '_id'

				// Se intenta actualizar en base al _id del dispositivo creado en el modelo.
                const device = await DeviceGPS.findByIdAndUpdate(_id, {$push: 
                    {
                        position:{_id: Date.now(), lat:lat, lng:lng},	// Se agregan las nuevas coordenadas y la hora de registro como identificador.
                    },
                    battery: battery,										// Se actualiza la carga de la batería
                    alerta:alerta										// Se actualiza el estado de alerta
                });
                idZ = device.id_zona;
                codG = device.id_ganado;
                res.sendStatus(200);									// Status 200 (actualizado)
            }else{
                res.sendStatus(201);									// Status 201 (creado)
            }
        });
    }catch(error){		// Se imprime el error en consola de no poder registrar o actualizar un dispositivo con los datos recibidos.
        console.error(error);
        res.sendStatus(500);	// Status 500 (error interno del server)
    }finally{			// Siempre se verifica el estado de alerta de un dispositivo
        if(alerts===true){
            const zona = await ZonaSchema.findById(idZ);
            io.emit('alert fired', {_id: _id, id_ganado: codG, zona: zona.nombre});
            var payload = {
				notification: {
				  title: "Alerta en la zona: " + zona.nombre,
				  body: "El Animal " + id_ganado  + " se ha desconectado"
				}
			  };
			admin.messaging().sendToTopic("GanTrack",payload);
        }
    }
});

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://gantrack-a58c4.firebaseio.com"
  });

module.exports = router;