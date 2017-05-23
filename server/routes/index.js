var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user.js');
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/main.html');
});

//Register new account
router.post('/register', function(req, res, next) {
	ctrlUser.addUser(req, res);
});

//Registration page
router.get('/register', function(req, res, next) {
	res.render('register');
});

//Login page
router.get('/login', function(req, res, next) {
	res.render('login', { user: req.user });
});

//Login to site
router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

//Logout
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
})

module.exports = router;