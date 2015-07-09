var express = require('express');
var router = express.Router();
var db_users = require('../database/db_users');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  db_users.findUserById(req.params.id, function (err, user) {
    if (err == null && user != null) {
      res.send(user);
    } else {
      res.send("user not found");
    }
  });
});

module.exports = router;
