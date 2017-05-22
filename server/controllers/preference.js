require('../models/db');
var mongoose = require('mongoose');
var Preference = mongoose.model('Preference');
var User = mongoose.model('User');
var ctrlProfile = require('./profile'); 

module.exports.addPreference = function(req, res) {
	//Callback function for adding preference
	var addPreference = function(user) {
		var newPreference = new Preference({
			username: req.body.username,
			gender: req.body.gender
		});
		newPreference.save(function(err, data) {
			if(err) {
				console.log(err);
				res.status(500);
				res.render('error', {
					message:err.message,
					error:err
				});
			} else {
				console.log(data, 'saved');
				//Render the user's profile page
				ctrlProfile.getProfile({params: {username: req.body.username}}, res);
			}
		});
	}

	//Check user exists, call addPreference callback or send JSON string
	User.find({username: req.body.username}).exec(
		function(err, found) {
			if (err) {
				console.log(err);
				res.render('error', {
					message:err.message,
					error:err
				});
			} else {
				if (found.length > 0) {
					addPreference(found[0]);
				} else {
					res.setHeader('Content-Type', 'application/json');
    				res.send(JSON.stringify({ message : "User doesn't exist"}));
				}
			}
		}
	);
}

