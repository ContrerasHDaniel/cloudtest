const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/stats', isAuthenticated, (req, res) => {
    res.render('stats');
});

module.exports = router;