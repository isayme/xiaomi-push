var _ = require('lodash');
var debug = require('debug')('mipush:subscription');
var utils = require('./utils');
var constant = require('./constant');

var Subscription = function(options) {
  debug('init subscription:', options);

  utils.parseOptions.call(this, options, {
    supportSandbox: true
  });

  if (this.options.production) {
    this.apis = _.clone(constant.tracerAPI);
  } else {
    this.apis = _.clone(constant.tracerSandboxAPI);
  }

  return this;
};

Subscription.prototype.request = utils.post;

/*
 * 给一个或一组regid列表订阅标签
 * regids: 单个regid字符串 或 多个用逗号分隔regid的字符串 或 regid数组
 *   注: 多个regid是最多限制1000个
 * topic: 标签名
 * category: 可为空
 */
Subscription.prototype.subscribeTopic = subscribeTopic;
function subscribeTopic(regids, topic, category, callback) {
  if (_.isArray(regids)) {
    regids = regids.join(',');
  }

  var data = {
    registration_id: regids,
    topic: topic,
    category: category
  };

  var api = this.apis.subscribe;
  this.request(api, data, callback);
}

/*
 * 取消一个或一组regid列表的标签
 * regids: 单个regid字符串 或 多个用逗号分隔regid的字符串 或 regid数组
 *   注: 多个regid是最多限制1000个
 * topic: 标签名
 * category: 可为空
 */
Subscription.prototype.unsubscribeTopic = unsubscribeTopic;
function unsubscribeTopic(regids, topic, category, callback) {
  if (_.isArray(regids)) {
    regids = regids.join(',');
  }

  var data = {
    registration_id: regids,
    topic: topic,
    category: category
  };

  var api = this.apis.unsubscribe;
  this.request(api, data, callback);
}

/*
 * 给一个或一组alias列表订阅标签
 * aliases: 单个alias字符串 或 多个用逗号分隔alias的字符串 或 alias数组
 * topic: 标签名
 * category: 可为空
 */
Subscription.prototype.subscribeTopicByAlias = subscribeTopicByAlias;
function subscribeTopicByAlias(aliases, topic, category, callback) {
  if (_.isArray(aliases)) {
    aliases = aliases.join(',');
  }

  var data = {
    aliases: aliases,
    topic: topic,
    category: category
  };

  var api = this.apis.subscribeAlias;
  this.request(api, data, callback);
}

/*
 * 取消一个或一组alias列表的标签
 * aliases: 单个alias字符串 或 多个用逗号分隔alias的字符串 或 alias数组
 * topic: 标签名
 * category: 可为空
 */
Subscription.prototype.unsubscribeTopicByAlias = unsubscribeTopicByAlias;
function unsubscribeTopicByAlias(aliases, topic, category, callback) {
  if (_.isArray(aliases)) {
    aliases = aliases.join(',');
  }

  var data = {
    aliases: aliases,
    topic: topic,
    category: category
  };

  var api = this.apis.unsubscribeAlias;
  this.request(api, data, callback);
}

module.exports = Subscription;
