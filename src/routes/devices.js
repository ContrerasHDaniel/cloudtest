const express = require('express');
const router = express.Router();

router.get('/devices', (req, res) => {
	res.render('devices');
});

module.exports = router;