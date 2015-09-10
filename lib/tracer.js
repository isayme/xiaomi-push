var _ = require('lodash');
var debug = require('debug')('mipush:tracer');

var utils = require('./utils');

var tracerMessageAPI = 'https://api.xmpush.xiaomi.com/v1/trace/message/status';
var tracerMessagesAPI = 'https://api.xmpush.xiaomi.com/v1/trace/messages/status';

var Tracer = function(options) {
  debug('init tracer:', options);

  options = options || {};
  this.options = options;

  if (!_.isString(options.appSecret)) {
    throw new Error('options.appSecret required!');
  }

  return this;
};

Tracer.prototype.getMessageStatus = function(msgId, callback) {
  var data = {
    msg_id: msgId
  };
  utils.get.call(this, tracerMessageAPI, data, callback);
};

Tracer.prototype.getMessagesStatus = function(beginTime, endTime, callback) {
  var data = {
    begin_time: beginTime,
    end_time: endTime
  };
  utils.get.call(this, tracerMessagesAPI, data, callback);
};

Tracer.prototype.getMessageGroupStatus = function(jobKey, callback) {
  var data = {
    job_key: jobKey
  };
  utils.get.call(this, tracerMessageAPI, data, callback);
};

module.exports = Tracer;
