const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const fetch = require('node-fetch');


router.post('/devices/dgps', async (req, res) => {    
    const {_id, id_ganado, nombre, id_zona, lat, lng, carga, alerta } = req.body;
    var b = ".";
    var positionLat = 2;
    var positionLng = 4;
    var outputLat = [lat.slice(0, positionLat), b, lat.slice(positionLat)].join('');
    var outputLng = [lng.slice(0, positionLng), b, lat.slice(positionLng)].join('');
    console.log("Lat: "+outputLat+" - Lng: "+outputLng);
    try{
        const newReg = new DeviceGPS(
            {
                _id:_id, 
                id_ganado: id_ganado, 
                nombre:nombre, 
                id_zona: id_zona, 
                position:{_id: Date.now(), lat:outputLat,lng:outputLng}, 
                carga:carga,
                alerta: alerta
            }

            
        );
        if(alerta){
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
    }
});

module.exports = router;