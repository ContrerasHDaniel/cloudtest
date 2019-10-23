const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const ZonaSchema = require('../models/Zona');
const FS = require('fs');
const path = require('path');

/* Ruta raíz del servidor */
router.get('/', (req, res) => {
	// Se dibuja la página login.hbs
	res.render('login');
});

/* Ruta index */
router.get('/index', isAuthenticated, async (req,res) => {

	// Obtiene todas las zonas registradas (PENDIENTE: para un usuario dado).
	const zonas = await ZonaSchema.find().exec(function(err, zonas){
		// Si obtiene los datos esperados, dibuja la página y pasa el objeto zonas
		// y la latitud y longitud de la primera zona encontrada para inicializar el mapa.
		res.render('index', 
		{
			zonas, 
			lat:zonas[0].lat, 
			lng:zonas[0].lng
		});
		// De no ser así, se dibuja la página sin pasar los datos.
		// Por consecuencia no se mostrarán datos.
		if (err) {
			console.error(err);		// Se imprime en consola el error.
			res.render('index');
		}
	});
});

/* Ruta para recursos de imágenes */
router.get('/public/img/:resource_name', (req, res) => {
	var file = './src/public/img/'+req.params.resource_name;
	
	/** TEMPORAL (para mayor seguridad, dar niveles de acceso a imagenes) **/
	FS.stat(file, function (err, success) {
		if (err) {
			res.sendStatus(403);
		} else {
			res.sendFile(path.join(__dirname, '../public/img/'+req.params.resource_name));
		}
	});
});

module.exports = router;