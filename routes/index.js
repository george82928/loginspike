var express = require('express');
var router = express.Router();
var groupsRouter = require('./admin/groups');
var templatesRouter = require('./admin/templates');
var charactersRouter = require('./admin/characters');
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/admin');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/admin/home',
		failureRedirect: '/admin',
		failureFlash : true  
	}));


	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/admin');
	});

	router.use('/groups', isAuthenticated, groupsRouter);
	router.use('/characters', isAuthenticated, charactersRouter);
	router.use('/templates', isAuthenticated, templatesRouter);

	return router;
}





