var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	ctrlUser.userList(req, res);
});

router.post('/', function(req, res, next) {
	ctrlUser.addUser(req, res);
})

module.exports = router;
