const express = require('express');
const router = express.Router();

router.post('/map', (req, res) => {
	res.render('map');
});

module.exports = router;