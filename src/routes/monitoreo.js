const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const ZonaSchema = require('../models/Zona');

router.get('/monitoreo', async(req, res) =>{
    const zonas = await ZonaSchema.find().exec(function(err,zonas){
        if (err) {
            res.sendStatus(500);
        }else{
            res.render('monitoreo', {zonas});
        }
    });
});

module.exports = router;