var debug = require('debug')('mipush:tracer')

var utils = require('./utils')

var constant = require('./constant')
var tracerMessageAPI = constant.tracerMessageAPI
var tracerMessagesAPI = constant.tracerMessagesAPI

var Tracer = function (options) {
  debug('init tracer:', options)

  utils.parseOptions.call(this, options)

  // convert to global url
  if (this.options.global) {
    tracerMessageAPI = tracerMessageAPI.replace('xmpush.xiaomi', 'xmpush.global.xiaomi');
    tracerMessagesAPI = tracerMessagesAPI.replace('xmpush.xiaomi', 'xmpush.global.xiaomi');
  }
  return this
}

Tracer.prototype.getMessageStatus = function (msgId) {
  var data = {
    msg_id: msgId
  }
  return utils.get.call(this, tracerMessageAPI, data)
}

Tracer.prototype.getMessagesStatus = function (beginTime, endTime) {
  var data = {
    begin_time: beginTime,
    end_time: endTime
  }
  return utils.get.call(this, tracerMessagesAPI, data)
}

Tracer.prototype.getMessageGroupStatus = function (jobKey) {
  var data = {
    job_key: jobKey
  }
  return utils.get.call(this, tracerMessageAPI, data)
}

module.exports = Tracer
