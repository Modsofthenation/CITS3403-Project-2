var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile.js');

router.get('/', function(req, res, next) {
	//If logged in show your profile, else go to login page
	ctrlProfile.myProfile(req, res);
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
