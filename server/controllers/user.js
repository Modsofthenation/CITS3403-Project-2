require('../models/db');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');

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
	//First see if username is taken
	User.find({username:req.body.username}).exec(
		function(err, usersFound) {
			if (err) {
				res.render('error', {
					message:err.message,
					error: err
				});
			} else {
				if (usersFound.length > 0) {
					res.setHeader('Content-Type', 'application/json');
    				res.send(JSON.stringify({ message : "Username taken"}));
				} else {
					//Username not taken, now check email
					User.find({email:req.body.email}).exec(
						function(err, usersFound){
							if (err) {
								res.render('error', {
									message:err.message,
									error: err
								});
							} else {
								if (usersFound.length > 0) {
									res.setHeader('Content-Type', 'application/json');
    								res.send(JSON.stringify({ message : "Email taken"}));
								} else {
									//Username and email are available, now add users
									var newUser = new User ({
											username:      req.body.username,
											password:      req.body.password,
											email:         req.body.email,
									});
									newUser.save(function(err, data){
										if(err) {
											console.log(err);
											res.status(500);
											res.render('error', {
												message:err.message,
												error:err
											});
										} else {
											console.log(data, 'saved');
											index(req, res);
										}
									});		
								}		
							}
						});
					}
				}
			});
		}