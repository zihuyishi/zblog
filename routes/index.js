var express = require('express');
var router = express.Router();
var config = require('../base/config');
var base = require('../base/base');
var db_users = require('../database/db_users');
var DB_helper = require('../database/db_helper');
var SubjectInfo = require('../base/subjectInfo');
var UserInfo = require('../base/userInfo');


function requireLogin(req, res, next) {
    if (!req.user) {
        req.session.reset();
        res.redirect('/login');
    } else {
        next();
    }
}

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

/* Get new subject page. */
router.get('/newsubject', function (req, res, next) {
    if (req.user != null) {
        res.render('newsubject', {title:"new article"});
    } else {
        res.redirect('/login');
    }
});

router.post('/newsubject', requireLogin, function (req, res, next) {
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
router.get('/login', function (req, res, next) {
    if (req.user != null) {
        res.redirect('/dashboard');
    } else {
        res.render('login', {});
    }
});

router.post('/login', function (req, res, next) {
    var user = new UserInfo;
    user.setUsername(req.body.username);
    user.setPassword(base.passwordHash(req.body.password));
    // query user exists
    var db = new DB_helper();
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
router.get('/dashboard', requireLogin, function(req, res) {
   res.send('this is dashboard');
});


module.exports = router;
