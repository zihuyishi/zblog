/**
 * Created by lichong on 15/7/7.
 */
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var config = require('../base/config');
var assert = require('assert');

var url = config.url;

var DBClient = function () {
    var client = {},
        database = null;

    client.connect = function (callback) {
        mongoClient.connect(url, function (err, db) {
            if (err == null) {
                database = db;
            }
            if (callback) {
                callback(err);
            }
        });
    };

    client.close = function () {
        assert(database != null);
        database.close();
        database = null;
    };

    client.getMongoDB = function () {
        return database;
    };

    client.insert = function (table, data, callback) {
        assert(database != null);
        database.collection(table).insertOne(data, function (err, result) {
            if (callback instanceof Function) {
                callback(err, result);
            }
        });
    };

    client.insertArray = function (table, array, callback) {
        assert(database != null);
        assert(Array.isArray(array));
        database.collection(table).insertMany(array, function (err, result) {
            if (callback instanceof Function) {
                callback(err, result);
            }
        });
    };

    client.query = function (table, condition, callback) {
        assert(database != null);
        var cursor = database.collection(table).find(condition);
        if (callback instanceof Function) {
            callback(cursor);
        }
    };

    client.queryAll = function (table, callback) {
        assert(database != null);
        var cursor = database.collection(table).find();
        if (callback instanceof Function) {
            callback(cursor);
        }
    };

    client.updateOne = function (table, condition, operate, callback) {
        assert(database != null);
        database.collection(table).updateOne(condition, operate, function (err, results) {
            if (callback instanceof Function) {
                callback(err, results);
            }
        });
    };

    client.update = function (table, condition, operate, callback) {
        assert(database != null);
        database.collection(table).updateMany(condition, operate, function (err, results) {
            if (callback instanceof Function) {
                callback(err, results);
            }
        });
    };

    client.replaceOne = function (table, condition, data, callback) {
        assert(database != null);
        database.collection(table).replaceOne(condition, data, function (err, results) {
            if (callback instanceof Function) {
                callback(err, results);
            }
        });
    };

    client.delete = function (table, condition, callback) {
        assert(database != null);
        database.collection(table).deleteMany(condition, function (err, results) {
            if (callback instanceof Function) {
                callback(err, results);
            }
        });
    };

    return client;
};

module.exports = DBClient;

