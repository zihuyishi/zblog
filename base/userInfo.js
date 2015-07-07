/**
 * Created by lichong on 15/7/7.
 */
var userInfo = function () {
    var user = {},
        m_email, m_username,
        m_id, m_password;

    user.setUsername = function (name) {
        m_username = name;
    };
    user.getUsername = function () {
        return m_username;
    };
    user.setPassword = function (password) {
        m_password = password;
    };
    user.getPassword = function () {
        return m_password;
    };

    return user;
};

module.exports = userInfo;