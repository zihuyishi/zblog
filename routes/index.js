var express = require('express');
var router = express.Router();
var config = require('../base/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    var subjects = ['test1', 'test2', 'test3'];

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
        res.render('subject', {
            title: req.body.title,
            body: req.body.mytextarea
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
