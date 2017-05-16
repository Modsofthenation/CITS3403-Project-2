var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			profileKey: String,
			firstName:  String,
			middleName: String,
			lastName:   String,
			intersts:   [String],
			age:        Number,
			gender:     Boolean
		}
	);

mongoose.model('Profile', schema, 'profiles');