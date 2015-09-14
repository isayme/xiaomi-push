var _ = require('lodash');
var debug = require('debug')('mipush:stats');

var constant = require('./constant');
var statsAPI = constant.statsAPI;
var aliasStatsAPI = constant.aliasStatsAPI;
var topicStatsAPI = constant.topicStatsAPI;

var utils = require('./utils');

var Stats = function(options) {
  debug('init stats:', options);

  utils.parseOptions.call(this, options, {
    requirePackageName: true
  });

  return this;
};

/*
 * startDate: 表示开始日期, 必须符合yyyyMMdd的格式.
 * endDate: 表示结束日期, 必须符合yyyyMMdd的格式.
 * 注: 开始结束日期之间的跨度小于30天
 */
Stats.prototype.getStats = function(startDate, endDate, callback) {
  debug('getStats:', startDate, endDate);

  var data = {
    start_date: startDate,
    end_date: endDate,
    restricted_package_name: this.options.restrictedPackageName
  };

  utils.get.call(this, statsAPI, data, callback);
};

/*
 * 获取一个应用的某个用户目前设置的所有Alias
 */
Stats.prototype.getAliasesOf = function(regid, callback) {
  var data = {
    registration_id: regid,
    restricted_package_name: this.options.restrictedPackageName
  };
  utils.get.call(this, aliasStatsAPI, data, callback);
};

/*
 * 获取一个应用的某个用户目前订阅的所有Topic
 */
Stats.prototype.getTopicsOf = function(regid, callback) {
  var data = {
    registration_id: regid,
    restricted_package_name: this.options.restrictedPackageName
  };

  utils.get.call(this, topicStatsAPI, data, callback);
};

module.exports = Stats;
