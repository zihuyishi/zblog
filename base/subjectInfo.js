/**
 * Created by saye on 2015/7/6.
 */

var subjectInfo = function() {
    var that = this,
        info = {},
        m_link = null,
        m_title = null;

    /**
     * get link of subject
     * @returns {link string}
     */
    info.getLink = function () {
        return m_link;
    };
    /**
     * set link
     * @param link string type
     */
    info.setLink = function (link) {
        m_link = link;
    };
    /**
     * get title of subject
     * @returns {title string}
     */
    info.getTitle = function () {
        return m_title;
    };
    /**
     * set title
     * @param title string type
     */
    info.setTitle = function (title) {
        m_title = title;
    };

    return info;
};

exports.subjectInfo = subjectInfo;
