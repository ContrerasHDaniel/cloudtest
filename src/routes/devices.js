const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const Zona = require('../models/Zona');
const { isAuthenticated } = require('../helpers/auth');

/*Ruta para la página de listado de todos los dispositivos registrados (PENDIENTE: para un usuario dado)*/ 
router.get('/devices', isAuthenticated, async (req, res) => {
	// Consulta la base de datos de manera asíncrona y obtiene todos los dispositivos registrados
	const devices = await DeviceGPS.find().exec(function(err, devices){
		const zonas = Zona.find().exec(function(err, zonas){
			if (err) {
				console.log(err);
				res.render('devices');
			}else{
				res.render('devices',{devices, zonas});
			}
		});
		// Dibuja la página devices.hbs en el body de main.hbs y pasa un objeto 'devices' que puede utilizarse con handlebars dentro del html.
		//res.render('devices',{devices});
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

/* Ruta para obtener los detalles de un solo dispositivo */
router.post('/devices/:id', async (req,res) => {
	const device = await DeviceGPS.findById(req.params.id).exec(function(err, device){
		if (err) {
			res.json(err);
		} else {
			res.json(device);
		}
	});
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