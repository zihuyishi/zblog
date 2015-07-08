/**
 * Created by lichong on 15/7/7.
 */
var userInfo = function () {
    this.username = "";
    this.password = "";
    this.id = -1;
    this.email = "";
    this.level = -1;
};

userInfo.prototype.setUsername = function (name) {
    this.username = name;
};
userInfo.prototype.getUsername = function () {
    return this.username;
};
userInfo.prototype.setPassword = function (password) {
    this.password = password;
};
userInfo.prototype.getPassword = function () {
    return this.password;
};

userInfo.prototype.getJsonObj = function () {
    var obj = {};
    obj.username = this.username;
    obj.email = this.email;
    obj.id = this.id;
    obj.password = this.password;
    obj.leve = this.level;
    return obj;
};

userInfo.prototype.fromJsonObj = function (obj) {
    this.username = obj.username;
    this.email = obj.email;
    this.id = obj.id;
    this.password = obj.password;
    this.level = obj.level;
};

module.exports = userInfo;