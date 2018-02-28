var Tracer = require('../lib').Tracer
// var moment = require('moment')

var config = require('./config')

var tracer = new Tracer({
  appSecret: config.appSecret,
  production: config.production
})

tracer.getMessageStatus('slm22b64442382117138Tc').then(console.log, console.log)

// var startDate = moment().subtract(1, 'days').valueOf()
// var endDate = moment().valueOf()
// tracer.getMessagesStatus(startDate, endDate).then(console.log, console.log);

// tracer.getMessageGroupStatus('iiiii').then(console.log, console.log);
