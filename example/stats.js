// var moment = require('moment')

var Stats = require('../lib').Stats
var config = require('./config')

var s = new Stats({
  appSecret: config.appSecret,
  production: config.production,
  restrictedPackageName: config.restrictedPackageName
})

// var startDate = moment().subtract(7, 'days').format('YYYYMMDD')
// var endDate = moment().format('YYYYMMDD')
// s.getStats(startDate, endDate, config.callback);

s.getAliasesOf(config.regids[0], config.callback)
s.getTopicsOf(config.regids[0], config.callback)
