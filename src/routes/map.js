const express = require('express');
const router = express.Router();

router.post('/map', (req, res) => {
	var geoparams = {
		lat: req.body.lat,
		lng: req.body.lng,
	  };
	res.render('map',{geoparams});
});

module.exports = router;