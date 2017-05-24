require('../models/db');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');

module.exports.getProfile = function(req, res) {
	Profile.findOne({'username': req.params.username}).exec(
		function(err, profile) {
			if (err) {
				res.render('error', {
					message:err.message,
					error: err,
					user: req.user
				});
			}
			else {
				if (profile) {
					console.log('find complete');
					res.render('profile', {'user': req.user, 'profile' : profile});
				} else {
					console.log('no profile found');
					var error = {message: "Profile not found"};
					res.render('error', {'user': req.user, 'error' : error});
				}
			}
		}
	);
}

module.exports.editProfile = function(req, res) {
	//Redirect user to login if logged out
	if (!req.user)
		res.redirect('/login');
	//Pass current profile to profile editor if it exists
	Profile.findOne({username: req.user.username}).exec(
		function(err, found) {
			if (err) {
				console.log(err);
				res.render('error', {
					message:err.message,
					error:err,
					user: req.user
				});
			} else {
				if (found)
					res.render('profileEditor', { profile: found, user: req.user});
				else
					res.render('profileEditor', { user: req.user });
			}
		}
	);
}

module.exports.addProfile = function(req, res) {
	if (!req.user)
		res.redirect('/');
	//Delete profile if exists
	Profile.findOne({username: req.user.username}).exec(
		function(err, found) {
			if (err) {
				console.log(err);
				res.render('error', {
					message:err.message,
					error:err,
					user: req.user
				});
			} else {
				if (found) {
					found.remove();
				}
				addProfile();
			}
		}
	);

	var addProfile = function() {
		//Construct profile model
		var newProfile = new Profile ({
				username: req.user.username,
				firstname:  req.body.firstname,
				middlename: req.body.middlename,
				lastname:   req.body.lastname,
				bio: req.body.bio,
				//TODO: Handle interests
				interests:   req.body.interests,
				age:        req.body.age,
				gender:     req.body.gender
		});
		console.log(newProfile);
		newProfile.save(function(err, data){
			if(err) {
				console.log(err);
				res.status(500);
				res.render('error', {
					message:err.message,
					error:err
				});
			} else {
				console.log(data, 'saved');
				res.redirect("/profile/");
			}
		});
	}
}
