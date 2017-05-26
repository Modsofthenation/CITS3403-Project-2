require('../models/db');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');
var passport = require('passport');

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
    				res.render('register', { user: req.user, form : { email: req.body.email}, error: "Username taken" });
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
    					res.render('register', { user:req.user, form : { username: req.body.username}, error: "Email address taken" });
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
						res.redirect('/profile/edit');
					});
				}
			});
	}
}

module.exports.updateUser = function(req, res) {
	if (!req.user)
		res.redirect('/login');
	else { 
		updatePassword(req, res);
		updateEmail(req, res);
	}	
}

function updatePassword(req, res) {
	//Find user
	User.findByUsername(req.user.username).then(function(user) {
		user.setPassword(req.body.password, function() {
			user.save();
		});
	});
}

function updateEmail(req, res) {
	newEmail = req.body.email;
	User.findOne({user: req.body.username}, function(err, found) {
		if (err) {
			res.render('error', {
				message:err.message,
				error: err
			});
		} else {
			found.email = newEmail;
			found.save( function(err, newUser) {
				res.render('userSettings', {user: newUser});
			});
		}
	});
}

module.exports.deleteUser = function(req, res) {
	//Go to login page if not logged in
	if (!req.user)
		res.redirect("/login");
	//Go to user settings if wrong username
	if (req.user.username != req.body.username)
		res.redirect("/user");
	//Delete the user account
	User.findOne({username: req.body.username}).exec(function(err, found) {
		if (err) {
			res.render('error', {
				message:err.message,
				error: err
			});	
		} else {
			if (found) {
				req.logout();
				found.remove();
				//Now delete the user's profile.
				deleteUserProfile(req, res);
			}
		}
	});
}

function deleteUserProfile(req, res) {
	Profile.findOne({username: req.body.username}).exec(function(err, found) {
		if (err) {
			res.render('error', {
				message:err.message,
				error: err
			});	
		} else {
			if(found) {
				found.remove();
			}
			//Redirect to home page.
			res.redirect("/");
		}
	});
}