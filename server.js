var express = require('express');
var app      = express();
var port     = process.env.PORT || 8088;
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var favicon = require('serve-favicon');
var path = require('path');

var options = {
	host: 'localhost',
	port: 3306,
	user: 'pncdisney',
	password: 'password0',
	database: 'pncdisneydb'
};

var sessionStore = new MySQLStore(options);

app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser('session_cookie_secret')); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false, // don't save session if unmodified
	cookie: { maxAge : 3600000 },
	saveUninitialized: false // don't create session until something stored
}));

// required for passport
// required for passport
// app.use(session({
//     secret: 'iwantodosomething', // session secret
//     resave: true,
//     cookie: { maxAge : 3600000 },
//     saveUninitialized: true
// }));
// 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/admin', routes);

app.get('/', function(req, res) {
	res.send('hello world.');
});
/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;

