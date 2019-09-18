const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

/* Ruta raíz del servidor */
router.get('/', (req, res) => {
	// Se dibuja la página login.hbs
	res.render('login');
});

/* Ruta index */
router.get('/index', isAuthenticated, (req,res) => {
	// Se dibuja la página index.hbs
	res.render('index');
});
module.exports = router;