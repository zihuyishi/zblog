/**
 * Created by lichong on 15/7/7.
 */
var userInfo = function () {
    var userinfo = {},
        m_email, m_username,
        m_id, m_password;

    userinfo.setUsername = function (name) {
        m_username = name;
    };
    userinfo.getUsername = function () {
        return m_username;
    };
    userinfo.setPassword = function (password) {
        m_password = password;
    };
    userinfo.getPassword = function () {
        return m_password;
    };

    userinfo.getJsonObj = function () {
        var obj = {};
        obj.username = m_username;
        obj.email = m_email;
        obj.id = m_id;
        obj.password = m_password;
        return obj;
    };

    userinfo.fromJsonObj = function (obj) {
        m_username = obj.username;
        m_email = obj.email;
        m_id = obj.id;
        m_password = obj.password;
    };
    return userinfo;
};

module.exports = userInfo;