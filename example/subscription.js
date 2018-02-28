var Subscription = require('../lib').Subscription
var config = require('./config')

var s = new Subscription({
  appSecret: config.appSecret,
  production: config.production,
  restrictedPackageName: config.restrictedPackageName
})

s.subscribeTopic(config.regids[0], 'a', null).then(console.log, console.log)
