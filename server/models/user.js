var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var schema = new mongoose.Schema(
		{
			username: {type: String, unique: true},
			password:      String,
			email: {type: String, unique: true},			
		}
	);

schema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', schema, 'users');