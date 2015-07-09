/**
 * Created by lichong on 15/7/7.
 */

var mongoClient = require('mongodb').MongoClient;
var config = require('../base/config');
var userInfo = require('../base/userInfo');

var url = config.db_url;

var db_user = {

};

function _findUserByCondition(condition, callback) {
    mongoClient.connect(url, function (err, db) {
        if (err == null) {
            db.collection('users')
                .findOne(condition, function (err, doc) {
                    db.close();
                    if (err == null && doc != null) {
                        var user = new userInfo();
                        user.fromJsonObj(doc);
                        callback(err, user);
                    } else {
                        callback(err);
                    }
                });
        } else {
            callback(err);
        }
    });
}

db_user.findUserByName = function (username, callback) {
    _findUserByCondition({"username": username}, callback);
};

db_user.findUserById = function (userId, callback) {
    _findUserByCondition({"id": Number(userId)}, callback);
};

db_user.findUserByEmail = function (email, callback) {
    _findUserByCondition({"email": email}, callback);
};


module.exports = db_user;