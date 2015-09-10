var moment = require('moment');

var Stats = require('../lib').Stats;
var config = require('./config');

var s = new Stats({
  appSecret: config.appSecret,
  restrictedPackageName: config.restrictedPackageName
});

var startDate = moment().subtract(7, 'days').format('YYYYMMDD');
var endDate = moment().format('YYYYMMDD');
s.getStats(startDate, endDate, function(err, data) {
  if (err) {
    return console.log(err.message, err.code);
  }

  console.log(JSON.stringify(data));
});
