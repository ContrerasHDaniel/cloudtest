const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const { isAuthenticated } = require('../helpers/auth');

/*Ruta para la página de listado de todos los dispositivos registrados (PENDIENTE: para un usuario dado)*/ 
router.get('/devices', isAuthenticated, async (req, res) => {
	// Consulta la base de datos de manera asíncrona y obtiene todos los dispositivos registrados
	const devices = await DeviceGPS.find().exec(function(err, devices){
		// Dibuja la página devices.hbs en el body de main.hbs y pasa un objeto 'devices' que puede utilizarse con handlebars dentro del html.
		res.render('devices',{devices});
		// De no ser así, se dibuja la página sin pasar los datos.
		// Por consecuencia no se mostrarán datos.
		if (err) {
			console.error(err);		// Se imprime en consola el error.
			res.render('devices');
		}
	});
	
});

/* Ruta para obtener los dispositivos asociados a un id de zona recibido.*/
router.get('/devices/:id', isAuthenticated, async (req,res) => {
	// Consulta la base de datos de manera asíncrona donde el id_zona registrado dentro del documento de dispositivo
	// coincida con el id recibido por la ruta.
	const devices = await DeviceGPS.aggregate([
		{
			$match:{
				id_zona: req.params.id,
			}
		}
	]).exec(function(err,devices){// Si encuentra los datos sin problema realiza la función declarada
		
		// Se elimina el arreglo de posiciones para dejar solamente la última posición conocida del dispositivo.
		devices = getLastLatLng(devices);

		if(err){				// Envia un json con error si ocurre una excepcion en las operaciones anteriores
			res.json(err);
		}else{					// Envia un json con el objeto json formateado como respuesta
			res.json(devices);
		}
	});
});

/* Ruta para registrar/actualizar un dispositivo GPS */
router.post('/devices/dgps', async (req, res) => {    				
	// Se obtienen todos los campos enviados por el dispositivo
	var {_id, id_ganado, nombre, id_zona, lat, lng, carga, alerta } = req.body;
	
	// TEMPORAL: Mientras el dispositivo no emita la batería restante se genera un número aleatorio para reemplazar el valor nulo recibido.
	if(carga=='null' || carga == null){
		carga = Math.floor((Math.random() * 10) + 90).toString();
	}
	
	// Bandera para obtener si un dispositivo disparó una alerta.
	alerts = alerta == "true";
	
	try{
		
		// Se crea un modelo mongoose de dispositivo para guardar/actualizar la base de datos.
        const newReg = new DeviceGPS(
            {
                _id:_id, 
                id_ganado: id_ganado, 
                nombre:nombre, 
                id_zona: id_zona, 
                position:{_id: Date.now(), lat:lat,lng:lng}, // De acuerdo al esquema interno de posicion.
                carga: carga,
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
                    carga: carga,										// Se actualiza la carga de la batería
                    alerta:alerta										// Se actualiza el estado de alerta
                });
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
            io.emit('alert fired', {id_ganado: id_ganado, id_zona: id_zona});
        }
    }

});


/* Funciones de soporte */
// Conversion del número obtenido por la consulta a un flotante para latitud
function getLat(lat){
    var b = ".";
    var positionLat = 2;
    var outputLat = [lat.slice(0, positionLat), b, lat.slice(positionLat)].join('');
    return outputLat;
}

// Conversion del número obtenido por la consulta a un flotante para latitud
function getLng(lng){
    var b = ".";
    var positionLng = 4;
    var outputLng = [lng.slice(0, positionLng), b, lng.slice(positionLng)].join('');
    return outputLng;
}

// Modifica el arreglo de posiciones para dejar solamente la última posición conocida del dispositivo.
function getLastLatLng(devices){
	// Se mapea el documento devices, obtenido por la consulta para poder realizar operaciones como si fuera un arreglo.
	devices.map(function(device){
		// Se obtienen las últimas coordenadas en el arreglo position y se almacenan en variables temporales.
		var lat = device.position[device.position.length -1 ].lat;	
		var lng = device.position[device.position.length -1 ].lng;
		// Se borran las demás coordenadas contenidas en el arreglo position.
		device.position = [];
		// Se escriben en el arreglo position las últimas coordenadas.
		device.position = {lat: getLat(lat), lng: getLng(lng)};
		return device; 
	});
	// Se regresa el objeto modificado.
	return devices;
}


module.exports = router;