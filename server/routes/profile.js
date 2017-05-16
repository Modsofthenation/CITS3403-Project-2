var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile.js');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  //res.send('respond with a resource');
  ctrlProfile.getProfile(req, res);
});

router.post('/', function(req, res, next) {
	console.log("AAAAAAAAA");
	ctrlProfile.addProfile(req, res);
})


module.exports = router;
