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
    res.session.reset();
    res.redirect('/');
});

module.exports = router;
