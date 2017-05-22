var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username: {type: String, unique: true},
			password:      String,
			email:         String,
		}
	);

mongoose.model('User', schema, 'users');