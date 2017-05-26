var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user.js');
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { user: req.user });
});

//GET about page.
router.get('/about', function(req, res, next) {
	res.render('about', { user: req.user });
});

//POST new user
router.post('/register', function(req, res, next) {
	ctrlUser.addUser(req, res);
});

//GET registration page
router.get('/register', function(req, res, next) {
	res.render('register', { user: req.user });
});

//GET login page
router.get('/login', function(req, res, next) {
	res.render('login', { user: req.user });
});

//POST login request
router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

//GET logout
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

//GET user settings page
router.get('/user', function(req, res) {
	if (!req.user)
		res.redirect('/login');
	else
		res.render('userSettings', { user: req.user });
});

//POST new user details
router.post('/user', function(req,res) {
	ctrlUser.updateUser(req, res);
});

//POST a user deletion request
router.post('/delete', function(req, res) {
	ctrlUser.deleteUser(req, res);
});

module.exports = router;