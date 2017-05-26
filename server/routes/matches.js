var express = require('express');
var router = express.Router();
var ctrlMatches = require('../controllers/matches.js');

//Get page for entering match preferences
router.get('/', function(req, res, next) {
	if (req.user) {
		res.render('matchesPreferences', {user: req.user});
	} else {
		res.redirect('/login');
	}
});

//POST preferences, return all found matches
router.post('/', function(req, res, next) {
	ctrlMatches.getMatches(req, res);
});

module.exports = router;
