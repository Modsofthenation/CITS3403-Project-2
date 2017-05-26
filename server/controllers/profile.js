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
	//Redirect if not logged in 
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
				//Calculate lattitude and longitude values
				geocode(req, res);
			}
		}
	);
}

function geocode(req, res) {
	var googleMapsClient = require('@google/maps').createClient({
		key: 'AIzaSyBqrC5SwJqfHfy4ggs-50jcfE9uiyDt_l4'
	});

	googleMapsClient.geocode({
		address: req.body.suburb + ', ' + req.body.state + ', ' + req.body.country
	}, function(err, response) {
		if (err) {
			console.log(error);
			res.status(500);
			res.render('error', {
				message:err.message,
				error:err
			});
		} else {
			addProfileCallback(req, res, response);
		}
	});
}

function addProfileCallback(req, res, geocodeResponse) {
	var newProfile = new Profile ({
			username: req.user.username,
			firstname:  req.body.firstname,
			middlename: req.body.middlename,
			lastname:   req.body.lastname,
			bio: req.body.bio,
			interests:   req.body.interests,
			age:        req.body.age,
			gender:     req.body.gender,
	});

	if (geocodeResponse.json.status != 'OK') {
		returnLocationError(req, res, newProfile);
		return;
	} else {
		newProfile.lattitude = geocodeResponse.json.results[0].geometry.location.lat;
		newProfile.longitude = geocodeResponse.json.results[0].geometry.location.lng;
	}

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

function returnLocationError(req, res, profile) {
	var error = {message: "Profile not found"};
	res.render('profileEditor', {'user': req.user, 'error' : error, 'profile': profile});
}