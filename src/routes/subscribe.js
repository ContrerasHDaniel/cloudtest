const express = require('express');
const router = express.Router();
const Bluebird = require('bluebird');
const webPush = require('web-push');
const SSE = require('sse-node');
var alerta = false;

router.post('/subscribe', (req,res) =>{
    const subscription = req.body;
    
    const payload = JSON.stringify({title: 'Push Test'});
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));

    res.sendStatus(201);
});

router.get('/subscribe/alert', (req, res) =>{
    //console.log(req.headers.alerta=="true");
    const sse = SSE(req,res);
    const message = 'false';
    if(alerta){
        !!message
    }
    sse.send(message);
    sse.onClose(()=>console.log('Bye client'));
    /*
    const messages = ['first','second','third','fourth', 'fifth'];
    return Bluebird.each(messages, (message, index) =>{
        sse.write(message);
        return Bluebird.delay(2000);
    })
    .then(()=>{
        sse.end('qwerty');
    })
    .catch(next);*/

    /*res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    
    getAlert(res,req.headers.alerta);
    countdown(res, 10);
    
    if(req.alert){
        res.write("data:"+{alerta: req.alerta, data:"Alerta!"}+" \n \n");
    }else{
        res.write("data:"+{data:"Alerta"}+" \n \n");
    }
    */
});
/*
function getAlert(res, alert){
    if(alert){
        res.write("data:"+true+"\n\n");
    }else{
        res.write("data:"+false+"\n\n");
    }
}
function countdown(res, count) {
    res.write("data: " + count + "\n\n")
    if (count)
      setTimeout(() => countdown(res, count-1), 1000)
    else
      res.end()
}*/

module.exports = router;