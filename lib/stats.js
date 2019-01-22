var debug = require('debug')('mipush:stats')

var constant = require('./constant')
var statsAPI = constant.statsAPI
var aliasStatsAPI = constant.aliasStatsAPI
var topicStatsAPI = constant.topicStatsAPI

var utils = require('./utils')

var Stats = function (options) {
  debug('init stats:', options)

  utils.parseOptions.call(this, options, {
    requirePackageName: true
  })

    // convert to global url
    if (this.options.global) {
      statsAPI = statsAPI.replace('xmpush.xiaomi', 'xmpush.global.xiaomi');
      aliasStatsAPI = aliasStatsAPI.replace('xmpush.xiaomi', 'xmpush.global.xiaomi');
      topicStatsAPI = topicStatsAPI.replace('xmpush.xiaomi', 'xmpush.global.xiaomi');
    }

  return this
}

/*
 * startDate: 表示开始日期, 必须符合yyyyMMdd的格式.
 * endDate: 表示结束日期, 必须符合yyyyMMdd的格式.
 * 注: 开始结束日期之间的跨度小于30天
 */
Stats.prototype.getStats = function (startDate, endDate) {
  debug('getStats:', startDate, endDate)

  var data = {
    start_date: startDate,
    end_date: endDate,
    restricted_package_name: this.options.restrictedPackageName
  }

  return utils.get.call(this, statsAPI, data)
}

/*
 * 获取一个应用的某个用户目前设置的所有Alias
 */
Stats.prototype.getAliasesOf = function (regid) {
  var data = {
    registration_id: regid,
    restricted_package_name: this.options.restrictedPackageName
  }
  return utils.get.call(this, aliasStatsAPI, data)
}

/*
 * 获取一个应用的某个用户目前订阅的所有Topic
 */
Stats.prototype.getTopicsOf = function (regid) {
  var data = {
    registration_id: regid,
    restricted_package_name: this.options.restrictedPackageName
  }

  return utils.get.call(this, topicStatsAPI, data)
}

module.exports = Stats
