var express = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var favicon = require('static-favicon');
var path = require('path');

app.use(favicon());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
// required for passport
app.use(session({
    secret: 'iwantodosomething', // session secret
    resave: true,
    saveUninitialized: true
}));
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
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
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
