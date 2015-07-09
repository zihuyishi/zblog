var express = require('express');
var router = express.Router();
var config = require('../base/config');
var db_users = require('../database/db_users');
var DB_helper = require('../database/db_helper');
var SubjectInfo = require('../base/subjectInfo');

/* GET home page. */
router.get('/', function(req, res, next) {
    var subjects = ['4', '5', '6'];

    res.render('index', {
        title: config.blogName,
        subtitle: 'this is a simple blog',
        totalSubjects: subjects.length,
        allSubjects: subjects
    });
});

router.get('/logout', function (req, res) {
    req.session.reset();
    res.redirect('/');
});

router.get('/newsubject', function (req, res, next) {
    if (req.user != null) {
        res.render('newsubject', {title:"new article"});
    } else {
        res.redirect('/login');
    }
});

router.post('/newsubject', function (req, res, next) {
    if (req.user != null) {
        db_users.findUserByName(req.user.username, function (err, user) {
            if (err == null && user != null) {
                var subject = new SubjectInfo(req.body.title, req.body.mytextarea, user.getUserId());
                var db = new DB_helper();
                db.connect(function (err) {
                    if (err == null) {
                        db.insertSubject(subject, function (err, subject) {
                            db.close();
                            if (err == null) {
                                res.render('subject', {
                                    title: subject.getTitle(),
                                    body: subject.getContent()
                                });
                            } else {
                                next(err);
                            }
                        });
                    } else {
                        next(err);
                    }
                });
            } else {
                res.redirect('/login');
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/subject/:id', function (req, res, next) {
    var db = new DB_helper();
    db.connect(function (err) {
        if (err == null) {
            db.query('subjects', {id: Number(req.params.id)}, function (err, result) {
                if (err == null) {
                    result.next(function (err, doc) {
                        db.close();
                        if (err == null && doc != null) {
                            var subject = new SubjectInfo();
                            subject.fromJsonObj(doc);
                            res.render('subject', {
                                title: subject.getTitle(),
                                body: subject.getContent()
                            });
                        } else if (doc == null) {
                            next({message:"subject not found", status:404});
                        } else {
                            next(err);
                        }
                    });
                } else {
                    next(err);
                }
            });
        } else {
            next(err);
        }
    })
});

module.exports = router;
