var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	ctrlUser.userList(req, res);
});

//Register new account
router.post('/register', function(req, res, next) {
	ctrlUser.addUser(req, res);
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

module.exports = router;
