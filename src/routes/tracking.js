const express = require('express');
const router = express.Router();

router.get('/tracking', (req, res) => {
	res.render('tracking');
});

module.exports = router;