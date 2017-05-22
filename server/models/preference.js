var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username: {type: String, unique: true},
			gender: {type: String, enum: ['male', 'female']},
		}
	);

mongoose.model('Preference', schema, 'preferences');