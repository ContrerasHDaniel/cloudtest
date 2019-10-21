
router.get('/mobile/zones', isAuthenticated, async (req, res) => {
	const zones = await Zona.find().exec(function(err, zones){
		//Regresa un JSONArray con las zonas disponibles
        res.json(zones);
        console.log(zones);
		if (err) {
			console.error(err);
		}
	});
	
});

router.post('/mobile/users/signin', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err)
            return next(err);
        if(!user)
            return res.status(400).json({SERVER_RESPONSE: 0, SERVER_MESSAGE: "Wrong Credentials"});
        req.logIn(user, function(err) {
            if (err)
                return next(err);
            if (!err)
                return res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!" });
            
        });
    })(req, res, next);
});

router.get('/mobile/devices', isAuthenticated, async (req, res) => {
	// Consulta la base de datos de manera asíncrona y obtiene todos los dispositivos registrados
	const devices = await DeviceGPS.find().exec(function(err, devices){
		const zonas = Zona.find().exec(function(err, zonas){
			if (err) {
				res.sendStatus(500);
			}else{
				res.json(devices);
			}
		});
	});
});
