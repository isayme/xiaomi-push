var _ = require('lodash')
var debug = require('debug')('mipush:notification')

var utils = require('./utils')
var constant = require('./constant')

var Notification = function (options) {
  debug('notification init:', options)

  utils.parseOptions.call(this, options, {
    supportSandbox: true
  })

  if (this.options.production) {
    this.apis = _.clone(constant.notificationAPI)
  } else {
    this.apis = _.clone(constant.notificationSandboxAPI)
  }

  // convert to global url
  if (this.options.global) {
    _.each(this.apis, (url, key) => {
      this.apis[key] = url.replace('xmpush.xiaomi', 'xmpush.global.xiaomi');
    })
  }

  return this
}

Notification.prototype.request = utils.post

Notification.prototype.sendToRegid = function (regid, msg) {
  debug('sendToRegid:', regid, msg)
  var api = this.apis.regid
  if (!_.isArray(regid)) {
    regid = [regid]
  }
  msg.set('registration_id', regid.join(','))
  return this.request(api, msg.getData())
}
Notification.prototype.send = Notification.prototype.sendToRegid

Notification.prototype.sendToAlias = function (alias, msg) {
  debug('sendToAlias:', alias, msg)
  var api = this.apis.alias
  if (!_.isArray(alias)) {
    alias = [alias]
  }
  msg.set('alias', alias.join(','))
  return this.request(api, msg.getData())
}

Notification.prototype.sendToUserAccount = function (uc, msg) {
  debug('sendToUserAccount:', uc, msg)
  var api = this.apis.account
  if (!_.isArray(uc)) {
    uc = [uc]
  }
  msg.set('user_account', uc.join(','))
  return this.request(api, msg.getData())
}

Notification.prototype.sendToTopic = function (topic, msg) {
  debug('sendToTopic:', topic, msg)
  var api = this.apis.topic
  if (!_.isArray(topic)) {
    topic = [topic]
  }
  msg.set('topic', topic.join(','))
  return this.request(api, msg.getData())
}

Notification.prototype.sendToAll = function (msg) {
  debug('sendToAll:', msg)
  var api = this.apis.all
  return this.request(api, msg.getData())
}

module.exports = Notification
