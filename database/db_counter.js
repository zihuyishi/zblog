/**
 * Created by lichong on 15/7/8.
 */

var mongoClient = require('mongodb').MongoClient;
var config = require('../base/config');

var url = config.db_url;

function _initCounter(db, table, callback) {
    db.collection('counters').insertOne(
        {_id: table, seq: 0},
        function (err, result) {
            db.close();
            if (err == null) {
                callback(err, 0);
            } else {
                callback(err);
            }
        }
    )
}
function _findAndUpdate(db, table, callback) {
    db.collection('counters').findOneAndUpdate(
        {_id: table},
        {$inc: {seq: 1}},
        {returnOriginal: false},
        function (err, result) {
            if (err == null && result.value != null) {
                db.close();
                callback(err, result.value.seq);
            } else { //counter not init
                _initCounter(db, table, callback);
            }
        }
    );
}

/**
 * 数据库计数器
 * @param table 请求的collection名
 * @param callback  function (err, seq: number)
 */
var counter = function (table, callback) {
    mongoClient.connect(url, function (err, db) {
        if (err == null) {
            _findAndUpdate(db, table, callback);
        } else {
            callback(err);
        }
    })
};

module.exports=counter;