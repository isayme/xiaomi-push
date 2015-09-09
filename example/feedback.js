var Feedback = require('../lib').Feedback;
var config = require('./config');

var feedback = new Feedback({
  production: config.production,
  appSecret: config.appSecret
});

feedback.request(function(err, list) {
  console.log(JSON.stringify(list, null, 2));
});
