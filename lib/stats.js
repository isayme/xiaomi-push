var _ = require('lodash');
var urllib = require('urllib');
var debug = require('debug')('mipush:stats');

var statsAPI = 'https://api.xmpush.xiaomi.com/v1/stats/message/counters';

var Stats = function(options) {
  debug('init stats:', options);

  if (_.isString(options)) {
    this.appSecret = options;
  } else {
    this.appSecret = options.appSecret;
  }

  if (!_.isString(this.appSecret)) {
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

  urllib.request(statsAPI, {
    method: 'GET',
    headers: {
      Authorization: 'key=' + this.appSecret
    },
    data: {
      start_date: startDate,
      end_date: endDate
    },
    dataType: 'json'
  }, function(err, data, res) {
    debug('getStats result:', JSON.stringify(data, null, 2));

    if (err) {
      return callback(err);
    }

    if (data.result === 'ok') {
      callback(null, data.data);
    } else {
      err = new Error(data.reason);
      err.code = data.code;
      callback(err);
    }
  });
};

module.exports = Stats;
