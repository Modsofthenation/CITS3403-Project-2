var mongoose = require('mongoose');

var schema = new mongoose.Schema(
		{
			sentUsername: String,
			destUsername: String,
			timestamp:    Date,
			read:         Boolean,
			content:      String
		}
	);

mongoose.model('Message', schema, 'messages');