var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username: String,
			gender: { type: String, enum: ['male', 'female']},
		}
	);

mongoose.model('Preference', schema, 'preferences');