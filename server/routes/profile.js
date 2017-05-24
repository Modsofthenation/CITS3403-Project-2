var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile.js');

router.get('/', function(req, res, next) {
	//If logged in show your profile, else go to login page
	if (req.user) {
		res.redirect('/profile/user/' + req.user.username);
	} else {
		res.redirect('/login');
	}
})

router.get('/user/:username', function(req, res, next) {
  ctrlProfile.getProfile(req, res);
});

router.post('/', function(req, res, next) {
	ctrlProfile.addProfile(req, res);
})

router.get('/edit', function(req, res, next) {
	ctrlProfile.editProfile(req, res);
})

module.exports = router;
