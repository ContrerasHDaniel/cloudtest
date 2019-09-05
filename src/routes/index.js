const express = require('express');
const router = express.Router();

/* Ruta raíz del servidor */
router.get('/', (req, res) => {
	// Se dibuja la página index.hbs
	res.render('index');
});

module.exports = router;