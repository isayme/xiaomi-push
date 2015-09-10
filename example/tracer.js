var Tracer = require('../lib').Tracer;
var moment = require('moment');

var config = require('./config');

var tracer = new Tracer({
  appSecret: config.appSecret,
});

// tracer.getMessageStatus('slm39b42441900121510MF', config.callback);

var startDate = moment().subtract(1, 'days').valueOf();
var endDate = moment().valueOf();
tracer.getMessagesStatus(startDate, endDate, config.callback);
