require('../models/db');
var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

module.exports.getProfile = function(req, res) {
	Profile.find({'username': req.params.username}).exec(
		function(err, profile) {
			if (err) {
				res.render('error', {
					message:err.message,
					error: err
				});
			}
			else {
				if (profile.length > 0) {
					console.log('find complete');
					res.render('profile', {'profile' : profile[0]});
				} else {
					console.log('no profile found');
					var error = {message: "Profile not found"};
					res.render('error', {'error' : error});
				}
			}
		}
	);
}

module.exports.addProfile = function(req, res) {
	var newProfile = new Profile ({
			username: req.body.username,
			firstname:  req.body.firstname,
			middlename: req.body.middlename,
			lastname:   req.body.lastname,
			bio: req.body.bio,
			//TODO: Loop over interests
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
			res.render('profile', {'profile' : newProfile});
		}
	})

}
