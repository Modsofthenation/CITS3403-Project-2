var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username: String,
			firstname:  String,
			middlename: String,
			lastname:   String,
			bio:        String,
			interests:   [String],
			age:        Number,
			gender:     Boolean
		}
	);

mongoose.model('Profile', schema, 'profiles');