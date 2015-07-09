/**
 * Created by saye on 2015/7/6.
 */

var subjectInfo = function(title, content, userId) {
    this.m_title = title;
    this.m_content = content;
    this.m_userId = userId;
    this.m_id = -1;
};

subjectInfo.prototype.getTitle = function () {
    return this.m_title;
};
subjectInfo.prototype.setTitle = function (title) {
    this.m_title = title;
};
subjectInfo.prototype.getContent = function () {
    return this.m_content;
};
subjectInfo.prototype.setContent = function (content) {
    this.m_content = content;
};
subjectInfo.prototype.setUserId = function (userId) {
    this.m_userId = userId;
};
subjectInfo.prototype.getUserId = function () {
    return this.m_userId;
};
subjectInfo.prototype.setId = function (id) {
    this.m_id = id;
};
subjectInfo.prototype.getId = function () {
    return this.m_id;
};

subjectInfo.prototype.getJsonObj = function () {
    var obj = {};
    obj.content = this.m_content;
    obj.title = this.m_title;
    obj.userId = this.m_userId;
    obj.id = this.m_id;
    return obj;
};

subjectInfo.prototype.fromJsonObj = function (obj) {
    this.m_content = obj.content;
    this.m_title = obj.title;
    this.m_userId = obj.userId;
    this.m_id = obj.id;
};


module.exports = subjectInfo;
