require('../models/db');
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

module.exports.sendMessage = function(req, res) {
	var newMessage = new Message({
		sentUsername: req.user.username,
		destUsername: req.params.username,
		timestamp: Date.now(),
		read: false,
		content: req.body.content
	});

	newMessage.save(function(err, data){
		if (err) {			
			console.log(err);
			res.status(500);
			res.render('error', {
				message:err.message,
				error:err,
				user: req.user
			});
		} else {
			console.log(data, 'saved');
			res.redirect("/message/sent/");
		}
	});
}

module.exports.getMessages = function(req, res) {
	Message.find({'destUsername': req.user.username}).exec( function(err, found) {
		if (err) {
			res.render('error', {
				message:err.message,
				error: err,
				user: req.user
			});
		} else {
			res.render('messages', {messages: found, user: req.user});
		}
	});
}

module.exports.messageCreator = function(req, res) {
	//Redirect to inbox if trying to message self
	if (req.params.username == req.user.username)
		res.redirect('/message');

	//Check user exists
	User.findOne({username: req.params.username}).exec(
		function(err, found) {
			if (err) {
				res.render('error', {
					message:err.message,
					error: err,
					user: req.user
				});
			} else {
				if (found)
					res.render('messageCreator', {destination: req.params.username, user: req.user});
				else
					//Go to inbox if user doesn't exist
					res.redirect('/message');
			}
		}
	);
}