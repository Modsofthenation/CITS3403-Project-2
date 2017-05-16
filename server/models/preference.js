var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			username: String,
			gender:   Boolean
		}
	);

mongoose.model('Preference', schema, 'preferences');