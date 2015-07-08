/**
 * Created by lichong on 15/7/7.
 */
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var config = require('../base/config');
var assert = require('assert');
var userInfo = require('../base/userInfo');

var url = config.db_url;

var DBClient = function () {
    this.database = null;
};

DBClient.prototype.connect = function (callback) {
    var self = this;
    mongoClient.connect(url, function (err, db) {
        if (err == null) {
            self.database = db;
        }
        if (callback) {
            callback(err);
        }
    });
};

DBClient.prototype.close = function () {
    assert(this.database != null);
    this.database.close();
    this.database = null;
};

DBClient.prototype.getMongoDB = function () {
    return this.database;
};

DBClient.prototype.insert = function (table, data, callback) {
    assert(this.database != null);
    this.database.collection(table).insertOne(data, function (err, result) {
        if (callback instanceof Function) {
            callback(err, result);
        }
    });
};

DBClient.prototype.insertArray = function (table, array, callback) {
    assert(this.database != null);
    assert(Array.isArray(array));
    this.database.collection(table).insertMany(array, function (err, result) {
        if (callback instanceof Function) {
            callback(err, result);
        }
    });
};

DBClient.prototype.query = function (table, condition, callback) {
    assert(this.database != null);
    var cursor = this.database.collection(table).find(condition);
    if (callback instanceof Function) {
        callback(cursor);
    }
};

DBClient.prototype.queryAll = function (table, callback) {
    assert(this.database != null);
    var cursor = this.database.collection(table).find();
    if (callback instanceof Function) {
        callback(cursor);
    }
};

DBClient.prototype.updateOne = function (table, condition, operate, callback) {
    assert(this.database != null);
    this.database.collection(table).updateOne(condition, operate, function (err, results) {
        if (callback instanceof Function) {
            callback(err, results);
        }
    });
};

DBClient.prototype.update = function (table, condition, operate, callback) {
    assert(this.database != null);
    this.database.collection(table).updateMany(condition, operate, function (err, results) {
        if (callback instanceof Function) {
            callback(err, results);
        }
    });
};

DBClient.prototype.replaceOne = function (table, condition, data, callback) {
    assert(this.database != null);
    this.database.collection(table).replaceOne(condition, data, function (err, results) {
        if (callback instanceof Function) {
            callback(err, results);
        }
    });
};

DBClient.prototype.delete = function (table, condition, callback) {
    assert(this.database != null);
    this.database.collection(table).deleteMany(condition, function (err, results) {
        if (callback instanceof Function) {
            callback(err, results);
        }
    });
};

//
DBClient.prototype.queryUserExist = function (user, callback) {
    assert(this.database != null);
    var cursor = this.database.collection('users')
        .find( {"username": user.getUsername(), "password": user.getPassword()} );
    var result = false;
    cursor.forEach(function (doc) {
        result = true;
    }, function (err) {
        if (callback) {
            callback(result);
        }
    });
};

module.exports = DBClient;

