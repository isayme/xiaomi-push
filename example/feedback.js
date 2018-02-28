var Feedback = require('../lib').Feedback
var config = require('./config')

var feedback = new Feedback({
  production: config.production,
  appSecret: config.appSecret
})

feedback.request.then(console.log, console.log)
