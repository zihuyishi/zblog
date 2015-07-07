/**
 * Created by lichong on 15/7/7.
 */
var express = require('express');
var router = express.Router();
var config = require('../base/config');
var userInfo = require('../base/userInfo');

router.get('/', function (req, res, next) {
    res.render('login', {});
});

router.post('/', function (req, res, next) {
    var user = userInfo();
    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
    var userData = user.getJsonObj();
    req.user = userData;
    delete req.user.password;
    req.session.user = req.user;
    res.redirect('/dashboard');
});


module.exports = router;