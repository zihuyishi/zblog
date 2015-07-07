/**
 * Created by lichong on 15/7/7.
 */
var express = require('express');
var router = express.Router();
var config = require('../base/config');

router.get('/', function (req, res, next) {
   res.send("this is login page");
});


module.exports = router;