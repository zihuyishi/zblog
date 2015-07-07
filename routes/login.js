/**
 * Created by lichong on 15/7/7.
 */
var express = require('express');
var router = express.Router();
var config = require('../base/config');
var userinfo = require('../base/userInfo');

router.get('/', function (req, res, next) {
    res.render('login', {});
});

router.post('/', function (req, res, next) {
    var user = userinfo();
    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
});


module.exports = router;