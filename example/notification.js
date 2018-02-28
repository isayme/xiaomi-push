var MiPush = require('../lib')
var Message = MiPush.Message
var Notification = MiPush.Notification

var config = require('./config')

var msg = new Message()
msg
  .title('title example')
  .description('description example')
  .payload('payload description')
  .passThrough(0)
  .notifyType(-1)
  .extra('badge', 6)

var notification = new Notification({
  production: config.production,
  appSecret: config.appSecret
})

var regid = config.regids[0]

notification.send(regid, msg).then(console.log, console.log)

// notification.sendToAll(msg).then(console.log, console.log);

// notification.sendToUserAccount('ua', msg).then(console.log, console.log);

// notification.sendToAlias('testAlias', msg).then(console.log, console.log);

// notification.sendToTopic('testTopoc', msg).then(console.log, console.log);
