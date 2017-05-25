var express = require('express');
var router = express.Router();
var ctrlMessage = require('../controllers/message.js');

//Get all messages
router.get('/', function(req, res, next) {
	if (req.user) {
		ctrlMessage.getMessages(req, res);
	} else {
		res.redirect('/login');
	}
});

//Get create message page
router.get('/:username', function(req, res, next) {
	if (req.user) {
		ctrlMessage.messageCreator(req, res);
	} else {
		res.redirect('/login');
	}
});

//Send message
router.post('/:username', function(req, res, next) {
	if (req.user) {
		ctrlMessage.sendMessage(req, res);
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
