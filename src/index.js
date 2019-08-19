const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

// Var inits
const app = express();
require('./dbconnect');

// Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',
				exhbs({
					defaultLayout: 'main',
					layoutsDir: path.join(app.get('views'), 'layouts'),
					partialsDir: path.join(app.get('views'), 'partials'),
					extname: '.hbs'
				}));

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

// Static Files
app.use(express.static(path.join(__dirname,'/public')));

// Server init
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});