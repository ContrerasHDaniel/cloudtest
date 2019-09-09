const express = require('express');
const router = express.Router();
const webPush = require('web-push');
const SSE = require('sse-node');

// ON WORKING PROGRESS
/* Ruta para subscribirse a notificaciones push */
router.post('/subscribe', (req,res) =>{
    const subscription = req.body;
    
    const payload = JSON.stringify({title: 'Push Test'});
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));

    res.sendStatus(201);
});

/* Ruta para subscribirse a la alerta */
router.get('/subscribe/alert', (req, res) =>{
    console.log(global.alerta);
    const sse = SSE(req,res);
    var message = 'false';
    if(global.alerta){
        console.log(global.alerta);
        message = 'true';
        sse.send(message);
    }
    
    sse.onClose(()=>{
        global.alerta = false;
        console.log('Bye client')
    });
});

module.exports = router;