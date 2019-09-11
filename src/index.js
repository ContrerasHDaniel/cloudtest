const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

// Var inits
const app = express();
require('./dbconnect');
//const publicVapidKey = "BFwZBMBKTHq_h07CVqNCbVBw46_gXhi1crRWvzUM0sCoNtW-foSYnabc7S0PSzLaMY2zgGC6V0Ip7fdrYt2TDmY";
//const privateVapidKey = "fPCiJk-TCouOgiwV9eXQhRew6QLHqWeOunw8ie_Ksj8";

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',
				exhbs({
					defaultLayout: 'main',
					layoutsDir: path.join(app.get('views'), 'layouts'),
					partialsDir: path.join(app.get('views'), 'partials'),
					extname: '.hbs',
					helpers: {
						getZonas: function(zonas) {
							var str;
							zonas.forEach(zona => {
								str += '<option value="'+zona._id+'">' + zona.nombre + '</option>';
							});
							return new Handlebars.SafeString(str);
						},

						fillDevices: function(devices) {
							var str;
							devices.forEach(device =>{
								if (device.id_zona == "g11111") {
									device.nombre_zona = "Rancho B";
								}else{
									device.nombre_zona = "Rancho A";
								}
								str+='<tr><th scope="row">'+device.id_ganado+'</th><td>'+device.nombre+'</td><td>'+device.nombre_zona+'</td><td class="table-success">Online</td></tr>';
							});
							
							return new Handlebars.SafeString(str);
						},
					}
				})
		);

app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}));

app.use(flash());

// Global vars
alerta = false;

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/update'));
app.use(require('./routes/tracking'));
app.use(require('./routes/devices'));
app.use(require('./routes/subscribe'));

// Static Files
var options ={
	setHeaders: function(res, path, stat){
		res.set('Service-Worker-Allowed', '/'),
		res.set('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, keep-alive')
	}
};
app.use(express.static(__dirname + '/public',options));

// Server init
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});
