var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/auth', require('./auth'));

module.exports = router;
