var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username: {type: String, unique: true},
			password:      String,
			email: {type: String, unique: true},
		}
	);

mongoose.model('User', schema, 'users');