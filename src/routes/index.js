const express = require('express');
const router = express.Router();

/* Ruta raíz del servidor */
router.get('/', (req, res) => {
	// Se dibuja la página login.hbs
	res.render('login');
});

/* Ruta index */
router.get('/index', (req,res) => {
	// Se dibuja la página index.hbs
	res.render('index');
});
module.exports = router;