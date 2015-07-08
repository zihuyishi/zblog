/**
 * Created by lichong on 15/7/7.
 */
var express = require('express');
var router = express.Router();
var base = require('../base/base');
var config = require('../base/config');
var userInfo = require('../base/userInfo');
var dbClient = require('../database/db_helper');

router.get('/', function (req, res, next) {
    res.render('login', {});
});

router.post('/', function (req, res, next) {
    var user = new userInfo;
    user.setUsername(req.body.username);
    user.setPassword(base.passwordHash(req.body.password));
    // query user exists
    var db = new dbClient();
    db.connect(function (err) {
        if (err == null) {
            db.queryUserExist(user, function (bResult) {
                if (bResult) {
                    req.user = user.getJsonObj();
                    delete req.user.password;
                    req.session.user = req.user;
                    res.redirect('/dashboard');
                } else {
                    res.render('login', {"info": "username or password is wrong"});
                }
                db.close();
            });
        } else {
           res.render('login', {"info": "sorry, server is busy"});
        }
    });
});


module.exports = router;