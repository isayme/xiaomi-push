var _ = require('lodash');
var debug = require('debug')('mipush:notification');

var utils = require('./utils');
var constant = require('./constant');

var Notification = function(options) {
  debug('notification init:', options);

  utils.parseOptions.call(this, options, {
    supportSandbox: true
  });

  if (this.options.production) {
    this.apis = _.clone(constant.notificationAPI);
  } else {
    this.apis = _.clone(constant.notificationSandboxAPI);
  }

  return this;
};

Notification.prototype.request = utils.post;

Notification.prototype.sendToRegid = function(regid, msg, callback) {
  debug('sendToRegid:', regid, msg);
  var api = this.apis.regid;
  if (!_.isArray(regid)) {
    regid = [regid];
  }
  msg.set('registration_id', regid.join(','));
  this.request(api, msg.getData(), callback);
};
Notification.prototype.send = Notification.prototype.sendToRegid;

Notification.prototype.sendToAlias = function(alias, msg, callback) {
  debug('sendToAlias:', alias, msg);
  var api = this.apis.alias;
  if (!_.isArray(alias)) {
    alias = [alias];
  }
  msg.set('alias', alias.join(','));
  this.request(api, msg.getData(), callback);
};

Notification.prototype.sendToUserAccount = function(uc, msg, callback) {
  debug('sendToUserAccount:', uc, msg);
  var api = this.apis.account;
  if (!_.isArray(uc)) {
    uc = [uc];
  }
  msg.set('user_account', uc.join(','));
  this.request(api, msg.getData(), callback);
};

Notification.prototype.sendToTopic = function(topic, msg, callback) {
  debug('sendToTopic:', topic, msg);
  var api = this.apis.topic;
  if (!_.isArray(topic)) {
    topic = [topic];
  }
  msg.set('topic', topic.join(','));
  this.request(api, msg.getData(), callback);
};

Notification.prototype.sendToAll = function(msg, callback) {
  debug('sendToAll:', msg);
  var api = this.apis.all;
  this.request(api, msg.getData(), callback);
};

module.exports = Notification;
