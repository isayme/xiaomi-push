var _ = require('lodash');
var urllib = require('urllib');
var debug = require('debug')('mipush:notification');

var apis = {
  'regid': '/v2/message/regid',
  'alias': '/v2/message/alias',
  'account': '/v2/message/user_account',
  'topic': '/v2/message/topic',
  'multitopic': '/v2/message/multi_topic',
  'all': '/v2/message/all'
};

var OfficalAPIs = _.mapValues(apis, function(value) {
  return 'https://api.xmpush.xiaomi.com' + value;
});

var SandboxAPIs = _.mapValues(apis, function(value) {
  return 'https://sandbox.xmpush.xiaomi.com' + value;
});

var defaults = {
  env: 'sandbox',
  timeout: '5000',
  gzip: false
};

var Notification = function(options) {
  debug('notification init:', options);

  options = options || defaults;
  this.options = options;

  for (var key in defaults) {
    if (options[key] === undefined || options[key] === null) {
      options[key] = defaults[key];
    }
  }

  if (!_.isString(options.appSecret)) {
    throw new Error('options.appSecret required!');
  }

  if (!_.include(['offical', 'sandbox'], options.env)) {
    throw new Error('options.env should in ["offical", "sandbox"]');
  } else {
    if (options.env === 'offical') {
      this.apis = _.clone(OfficalAPIs);
    } else {
      this.apis = _.clone(SandboxAPIs);
    }
  }

  return this;
};

Notification.prototype.request = function(url, options, callback) {
  debug('request:', url, options);

  options.method = 'POST';
  options.headers = {
    Authorization: 'key=' + this.options.appSecret
  };
  // options.contentType = 'json';
  options.dataType = 'json';
  options.timeout = this.options.timeout;
  options.gzip = this.options.gzip;

  urllib.request(url, options, callback);
};

Notification.prototype.sendToRegid = function(regids, msg, callback) {
  debug('sendToRegid:', regids, msg);
  var api = this.apis.regid;
  msg.set('registration_id', regids);
  this.request(api, {data: msg.getData()}, callback);
};
Notification.prototype.send = Notification.prototype.sendToRegid;

module.exports = Notification;
