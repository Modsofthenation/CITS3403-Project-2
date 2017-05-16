var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  ctrlUser.userList(req, res);
});

router.post('/', function(req, res, next) {
	ctrlUser.addUser(req, res);
})

router.get('/:username', function(req, res, next) {
	ctrlUser.getUser(req, res);
})


module.exports = router;
