/**
 * Created by lichong on 15/7/7.
 */
var express = require('express');
var router = express.Router();
var config = require('../base/config');

function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}
router.get('/', requireLogin, function(req, res) {
   res.send('this is dashboard');
});

module.exports = router;