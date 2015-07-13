/**
 * Created by lichong on 15/7/10.
 */

var express = require('express');
var router = express.Router();
var DB_helper = require('../database/db_helper');
var db_users = require('../database/db_users');

var SubjectInfo = require('../base/subjectInfo');

router.get('/subjectList', function (req, res, next) {
    var count = Number(req.query.count) || 10;
    var db = new DB_helper();
    if (count <= 0) {
        res.send({error: 1});
        return ;
    }
    db.connect(function (err) {
        if (err == null) {
            db.getLatestSubjects(count, function (err, subjects) {
               if (err == null) {
                   var list = [];
                   for (var i = 0; i < subjects.length; i++) {
                       list.push(subjects[i].getJsonObj());
                   }
                   res.send({error: 0, subjects: list});
               } else {
                   res.send({error: 1});
               }
               db.close();
            });
        } else {
            res.send({error: 1});
        }
    });
});

router.get('/searchUser', function (req, res, next) {
    if (req.query.userId == null) {
        res.send({error: 1});
        return ;
    }
    var userId = Number(req.query.userId);
    db_users.findUserById(userId, function (err, user) {
        if (err == null && user != null) {
            var userObj = user.getJsonObj();
            delete userObj.password;
            res.send({error: 0, user: userObj});
        } else {
            res.send({error: 1});
        }
    });
});


module.exports = router;