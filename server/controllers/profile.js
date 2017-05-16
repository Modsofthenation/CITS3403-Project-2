require('../models/db');
var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

module.exports.getProfile = function(req, res) {
	Profile.find({'username': req.params.username}).exec(
		function(err, profile) {
			console.log("profile: " + profile);
			if (err) {
				res.render('error', {
					message:err.message,
					error: err
				});
			}
			else {
				console.log('find complete');
				res.render('profile', {'profile' : profile});
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
