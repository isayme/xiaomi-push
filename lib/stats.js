var _ = require('lodash');
var urllib = require('urllib');
var debug = require('debug')('mipush:stats');

var constant = require('./constant');
var statsAPI = constant.statsAPI;

var utils = require('./utils');

var Stats = function(options) {
  debug('init stats:', options);

  if (_.isString(options)) {
    this.options = {
      appSecret: options
    };
  } else {
    this.options = options.appSecret;
  }

  if (!_.isString(this.options.appSecret)) {
    throw new Error('options.appSecret required');
  }

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
    end_date: endDate
  };

  utils.get.call(this, statsAPI, data, callback);
};

module.exports = Stats;
