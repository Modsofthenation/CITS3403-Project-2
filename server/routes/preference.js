var express = require('express');
var router = express.Router();
var ctrlPreference = require('../controllers/preference.js');

router.post('/', function(req, res, next) {
	ctrlPreference.addPreference(req, res);
});

module.exports = router;