/**
 * Created by saye on 2015/7/6.
 */

var fs = require('fs');

var configStr = fs.readFileSync(__dirname + "/config.json");
var config = JSON.parse(configStr);

module.exports = config;
