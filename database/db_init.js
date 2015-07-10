/**
 * Created by lichong on 15/7/7.
 */
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var config = require('../base/config');

var url = config.db_url;

var tryConnect = function () {
    mongoClient.connect(url, function (err, db) {
        if (err == null) {
            console.log("connected correctly to database server");
            db.close();
        } else {
            console.error("failed connected to database");
            throw err;
        }
    });
};

exports.tryDB = tryConnect;