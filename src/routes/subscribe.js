const express = require('express');
const router = express.Router();
const webPush = require('web-push');

router.post('/subscribe', (req,res) =>{
    const subscription = req.body;
    
    const payload = JSON.stringify({title: 'Push Test'});
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));

    res.sendStatus(201);
});

router.get('/subscribe/alert', (req, res)=>{
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    
    getAlert(res,req.headers.alerta);
    //countdown(res, 10);
    
    //if(req.alert){
        //res.write("data:"+{alerta: req.alerta, data:"Alerta!"}+" \n \n");
    //}else{
        //res.write("data:"+{data:"Alerta"}+" \n \n");
    //}
    
});

function getAlert(res, alert){
    if(alert){
        console.log('h');
        res.write("alerta: Alerta!\n\n");
    }else{
        res.write("alerta:"+false+"\n\n");
    }
}
function countdown(res, count) {
    res.write("data: " + count + "\n\n")
    if (count)
      setTimeout(() => countdown(res, count-1), 1000)
    else
      res.end()
}

module.exports = router;