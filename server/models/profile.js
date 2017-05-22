var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username: {type: String, unique: true},
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