var MiPush = require('../lib');
var Message = MiPush.Message;
var Notification = MiPush.Notification;

var msg = new Message();
msg
  .title('title example')
  .description('description example')
  .payload('payload description')
  .passThrough(1)
  .extra('badge', 6);

var notification = new Notification({
  env: 'offical',
  appSecret: 'your secret key'
});

var regid = 'one of your regid';

notification.send(regid, msg, function() {
  console.log(JSON.stringify(arguments, null, 2));
});
