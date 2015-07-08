/**
 * Created by lichong on 15/7/8.
 */
var express = require('express');
var router = express.Router();
var db_helper = require('../database/db_helper');
var userInfo = require('../base/userInfo');
var base = require('../base/base');
var counter = require('../database/db_counter');

router.get('/', function (req, res, next) {
   if (req.user != null) {
       res.redirect('/dashboard');
   }  else {
       res.render('signup');
   }
});

function _signupUser(req, res, db, user) {
    counter('users', function (err, userId) {
        if (err == null) {
            user.setUserId(userId);
            user.setLevel(1);
            db.insert('users', user.getJsonObj(), function (err, result) {
                db.close();
                if (err == null) {
                    req.session.reset();
                    req.user = user.getJsonObj();
                    delete req.user.password;
                    req.session.user = req.user;
                    res.redirect('/dashboard');
                } else {
                    res.render('signup', {info: err});
                }
            });
        } else {
            db.close();
            res.render('signup', {info: "server encouter an error"});
        }
    })
}

function _checkPost(req, db, res) {
    var user = new userInfo();
    user.setUsername(req.body.username);
    user.setPassword(base.passwordHash(req.body.password));
    user.setEmail(req.body.email);

    db.query('users', {
        $or: [{"username": user.getUsername()}, {"email": user.getEmail()}]
    }, function (err, result) {
        if (err == null) {
            var exits = false;
            result.forEach(function (doc) {
                exits = true;
            }, function (err) {
                if (err == null) {
                    if (exits) {
                        res.render('signup', {info: "username or email exists"});
                        db.close();
                    } else {
                        _signupUser(req, res, db, user);
                    }
                } else {
                    res.render('signup', {info: err});
                    db.close();
                }
            });
        } else {
            res.render('signup', {info: err});
            db.close();
        }
    });
}
router.post('/', function (req, res, next) {
    var db = new db_helper();
    db.connect(function (err) {
        if (err == null) {
            _checkPost(req, db, res);
        } else {
            res.render('signup', {info: err});
        }
    });
});

module.exports = router;