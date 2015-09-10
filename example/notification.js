var MiPush = require('../lib');
var Message = MiPush.Message;
var Notification = MiPush.Notification;

var config = require('./config');

var msg = new Message();
msg
  .title('title example')
  .description('description example')
  .payload('payload description')
  .passThrough(0)
  .notifyType(-1)
  .extra('badge', 6);

var notification = new Notification({
  production: config.production,
  appSecret: config.appSecret
});

var regid = config.regids[0];

function callback() {
  console.log(JSON.stringify(arguments, null, 2));
}

notification.send(regid, msg, callback);

// notification.sendToAll(msg, callback);

// notification.sendToUserAccount('ua', msg, callback);

// notification.sendToAlias('testAlias', msg, callback);

// notification.sendToTopic('testTopoc', msg, callback);
