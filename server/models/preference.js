var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			preferenceKey: String,
			gender:        Boolean,
		}
	);

mongoose.model('Preference', schema, 'preferences');