const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');


// Var inits
const app = express();
require('./dbconnect');
require('./config/passport');

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
								str += '<li data-value="'+zona._id+'"><span>' 
								+ zona.nombre + '</span>' 
								+ '</li>';
							});
							return new Handlebars.SafeString(str);
						},

						fillDevices: function(devices,zonas) {
							var str ="";
							var nameZona = "";
							devices.forEach(device =>{
								zonas.forEach(zona => {
									if(device.id_zona === zona._id){
										nameZona = zona.nombre;
									}
								});
								str+='<tr data-toggle=\"modal\" id=\"'+ device._id +'\" data-target=\"#updateModal\"><td>'
								+device.id_ganado+'</td><td id=\"nombre\">'
								+device.nombre+'</td><td id=\"id_zona\">'
								+nameZona+'</td>';

								if (device.alerta) {
									str+= '</td><td id = \"status\" class="table-danger">Desconectado</td></tr>';
								}else{
									str+= '</td><td id = \"status\" class="table-success">En línea</td></tr>';
								}
								
								
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
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req, res, next) => {
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/update'));
app.use(require('./routes/tracking'));
app.use(require('./routes/devices'));
app.use(require('./routes/users'));

// Static Files
var options ={
	setHeaders: function(res, path, stat){
		res.set('Service-Worker-Allowed', '/'),
		res.set('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, keep-alive')
	}
};
app.use(express.static(__dirname + '/public',options));

// Server init
server = app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});

// Socket init
io = require('socket.io')(server);

// Socket handler
io.on('connection', function(socket){
	socket.on('alert fired', function(from, msg){
	});
});
