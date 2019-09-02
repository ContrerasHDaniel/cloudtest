const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const webPush = require('web-push');
const bodyParser = require('body-parser');

// Var inits
const app = express();
require('./dbconnect');

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
								str+='<tr><th scope="row">'+device.id_ganado+'</th><th scope="col">'+device.nombre+'</th></tr>'
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

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/map'));
app.use(require('./routes/dgps'));
app.use(require('./routes/update'));
app.use(require('./routes/tracking'));
app.use(require('./routes/devices'));

// Static Files
app.use(express.static(path.join(__dirname,'/public')));

// Server init
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});
