const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');
const ZonaSchema = require('../models/Zona');


router.get('/tracking', async (req, res) => {
	const zonas = await ZonaSchema.find();
	res.render('tracking', 
		{
			zonas, 
			lat:zonas[0].lat, 
			lng:zonas[0].lng
		}
	);
});

//var _id = '2C5D71';
//	const data = await DeviceGPS.aggregate([
//		{
//			$match:{
//				_id:_id,
//			}
//		},
//		{
//			$unwind:"$position",
//		},
//		{
//			$sort:{'position._id':-1}
//		},
//		{
//			$limit: 1
//		}
//	]);
//	if(data.length>0){
//		const position = data[0].position;
//		res.render('tracking',{lat:position.lat,lng:position.lng});
//	}else{
//		console.log('something bad ocurred');
//		res.render('index');
//	}

module.exports = router;