const express = require('express');
const router = express.Router();
const DeviceGPS = require('../models/DeviceGPS');

router.post('/map', async (req, res) => {
	var _id = '2C5D71';
	console.log('hello')
	const data = await DeviceGPS.aggregate([
		{
			$match:{
				_id:_id,
			}
		},
		{
			$unwind:"$position",
		},
		{
			$sort:{'position._id':-1}
		},
		{
			$limit: 1
		}
	]);
	if(data.length>0){
		const position = data[0].position;
		res.render('map',{lat:position.lat,lng:position.lng});
	}else{
		console.log('something bad ocurred');
		res.render('index');
	}

});

module.exports = router;