/**
 * Created by lichong on 15/7/10.
 */

var express = require('express');
var router = express.Router();
var DB_helper = require('../database/db_helper');

var SubjectInfo = require('../base/subjectInfo');

router.get('/subjectList', function (req, res, next) {
    var count = Number(req.query.count) || 10;
    var list = [];
    var db = new DB_helper();
    if (count <= 0) {
        res.send({error: 1});
        return ;
    }
    db.connect(function (err) {
        if (err == null) {
            db.queryAll('subjects', function (err, cursor) {
                if (err == null) {
                    cursor.limit(count).toArray(function (err, items) {
                       if (err == null) {
                           for (var i = 0; i < items.length; i++) {
                               var subject = new SubjectInfo();
                               subject.fromJsonObj(items[i]);
                               list.push(subject.getJsonObj());
                           }
                           res.send({error: 0, subjects: list});
                       } else {
                           res.send({error: 1});
                       }
                       db.close();
                    });
                } else {
                    db.close();
                    res.send({error: 1});
                }
            });
        } else {
            res.send({error: 1});
        }
    });
});

module.exports = router;