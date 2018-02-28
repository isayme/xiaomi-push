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
// s.getStats(startDate, endDate).then(console.log, console.log);

s.getAliasesOf(config.regids[0]).then(console.log, console.log)
s.getTopicsOf(config.regids[0]).then(console.log, console.log)
