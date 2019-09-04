const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const fetch = require('node-fetch');
var alerts;

router.post('/devices/dgps', async (req, res) => {    
    const {_id, id_ganado, nombre, id_zona, lat, lng, carga, alerta } = req.body;
    alerts = alerta == "true";
    try{
        const newReg = new DeviceGPS(
            {
                _id:_id, 
                id_ganado: id_ganado, 
                nombre:nombre, 
                id_zona: id_zona, 
                position:{_id: Date.now(), lat:lat,lng:lng}, 
                carga: 82,
                alerta: alerta
            }

            
        );
        await newReg.save(async function (err) {
            if (err){
                const device = await DeviceGPS.findByIdAndUpdate(_id, {$push: 
                    {
                        position:{_id: Date.now(), lat:lat, lng:lng},
                    },
                    carga: carga,
                    alerta:alerta
                });
                res.sendStatus(200);
            }else{
                res.sendStatus(201);
            }
        });
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }finally{
        if(alerts===true){
            const url = 'http://localhost:3000/subscribe/alert';
            var headers = {
                alerta: alerta,
                id_ganado: id_ganado,
                id_zona:id_zona
            };
    
            fetch(url, {method: 'GET', headers: headers})
            .catch(function(err){
                console.error(err);
            });
        }

    }

});


module.exports = router;