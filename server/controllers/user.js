require('../models/db');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');
var passport = require('passport');

module.exports.userList = index;

function index(req, res) {
	User.find().exec(
		function(err, userslist) {
			if (err) {
				res.render('error', {
					message:err.message,
					error: err
				});
			}
			else {
				console.log('find complete');
				res.render('index', {'users':userslist});
			}
		}
	);
}

module.exports.addUser = function(req, res) {
	//Check username. Call email callback if valid
	User.find({username: req.body.username}).exec(
		function(err, usersFound) {
			if (err) {
				res.render('error', {
					message:err.message,
					error: err
				});
			} else {
				if (usersFound.length > 0) {
    				res.render('register', { form : { email: req.body.email}, error: "Username taken" });
				} else {
					checkEmail();
				}
			}
		}
	);

	//Callback for checking email. Calls user callback if valid
	var checkEmail = function() {
		User.find({email: req.body.email}).exec(
			function(err, usersFound){
				if (err){
					res.render('error', {
						message:err.message,
						error: err
					});
				} else {
					if (usersFound.length > 0) {
    					res.render('register', { form : { username: req.body.username}, error: "Email address taken" });
    				} else {
    					addUser();
    				}
				}
			}
		);
	}
	
	//Callback for adding the user
	var addUser = function() {
		User.register(new User({username: req.body.username, email: req.body.email}),
			req.body.password,
			function(err, account) {
				if (err) {
					res.render('error', {
						message:err.message,
						error: err
					});
				} else {
					passport.authenticate('local')(req, res, function(){
						res.redirect('/');
					});
				}
			});
	}
}