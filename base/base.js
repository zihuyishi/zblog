/**
 * Created by lichong on 15/7/8.
 */

var crypto = require('crypto');

var passHash = function (password) {
    var md5 = crypto.createHash('md5');
    var sha1 = crypto.createHash('sha1');

    md5.update(password);
    var md5Result = md5.digest('hex');
    sha1.update(md5Result);
    var sha1Result = sha1.digest('hex');
    return sha1Result;
};

exports.passwordHash = passHash;