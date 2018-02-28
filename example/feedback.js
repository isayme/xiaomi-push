var Feedback = require('../lib').Feedback
var config = require('./config')

var feedback = new Feedback({
  production: config.production,
  appSecret: config.appSecret
})

feedback.request(function (err, list) {
  console.log(err, JSON.stringify(list, null, 2))
})
