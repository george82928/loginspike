var LocalStrategy = require('passport-local').Strategy;
// var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

    passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function() {
            if (username === 'username' && password === 'password') {
                let user = {
                    id: 1,
                    username: 'username',
                    password: 'password'
                };
                return done(null, user);
            } else {
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            }
            });
        }
    ));

    // var isValidPassword = function(user, password) {
    //     return bCrypt.compareSync(password, user.password);
    // };

};