var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile.js');

router.get('/', function(req, res, next) {
	//If logged in show your profile, else go to login page
	ctrlProfile.myProfile(req, res);
})

//GET a user's profile
router.get('/user/:username', function(req, res, next) {
  ctrlProfile.getProfile(req, res);
});

//POST new profile
router.post('/', function(req, res, next) {
	ctrlProfile.addProfile(req, res);
})

//GET profile editing page
router.get('/edit', function(req, res, next) {
	ctrlProfile.editProfile(req, res);
})

module.exports = router;
