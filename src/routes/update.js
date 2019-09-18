const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const ZonaSchema = require('../models/Zona');
const { isAuthenticated } = require('../helpers/auth');

/* Ruta para la página de actualización de dispositivos (PENDIENTE: para un usuario dado)*/
router.get('/update', isAuthenticated, async (req, res) => {
	// Consulta la base de datos de manera asíncrona y obtiene todas las zonas registradas
	const zonas = await ZonaSchema.find().exec(async function(err,zonas){
		// Dibuja la página update.hbs en el body de main.hbs y pasa un objeto 'zonas' que puede utilizarse con handlebars dentro del html.
		res.render('update',{zonas})
		
		// De no ser así, se dibuja la página sin pasar los datos.
		// Por consecuencia no se mostrarán datos.
		if(err){
			console.error(err);
			res.render('update');
		}
	});
});
 
/* Ruta para la página de edición de un dispositivo dado */
/* OPCIÓN: Recibir los datos en objeto, sin hacer consulta de la BD*/
router.get('/update/edit/:id', isAuthenticated, async (req,res) => {
	const reg = await DeviceGPS.findById(req.params.id);
	const zona = await ZonaSchema.findById(reg.id_zona);
	res.render('edit', {reg,zona});
});

module.exports = router;
