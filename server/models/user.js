var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username:      String,
			password:      String,
			email:         String,
		}
	);

mongoose.model('User', schema, 'users');