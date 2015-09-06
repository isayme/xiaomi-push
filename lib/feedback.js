var util = require('util');
var EventEmitter = require('events').EventEmitter;

var urllib = require('urllib');
var _ = require('lodash');
var debug = require('debug')('mipush:feedback');

var feebackAPI = 'https://feedback.xmpush.xiaomi.com/v1/feedback/fetch_invalid_regids';

var Feedback = function(options) {
  debug('init feedback:', options);

  options = options || {};
  this.options = options;

  EventEmitter.call(this);

  if (options.env !== 'offical') {
    throw new Error('feedback only valid when options.env is "offical"');
  }

  if (!_.isString(options.appSecret)) {
    throw new Error('options.appSecret required, and must be string');
  }

  return this;
};

util.inherits(Feedback, EventEmitter);

Feedback.prototype.start = function() {
  debug('start feedback service with interval: ' + this.options.interval);

  this.cancel();

  if (this.options.interval > 0) {
    var interval = this.options.interval * 1000;
    this.interval = setInterval(this.request.bind(this), interval);
  }
};

Feedback.prototype.cancel = function() {
  debug('cancel feedback service');

  if (this.interval !== undefined) {
    clearInterval(this.interval);
    this.interval = undefined;
  }
};

Feedback.prototype.request = function(callback) {
  debug('do feedback request');

  var options = {
    methd: 'GET',
    headers: {
      Authorization: 'key=' + this.options.appSecret
    },
    dataType: 'json'
  };

  urllib.request(feebackAPI, options, function(err, data, res) {
    debug('request data: ' + JSON.stringify(data, null, 2));

    if (callback) {
      if (err) {
        return this.emit('error', err);
      }

      if (data.result === 'ok') {
        this.emit('feedback', data.data.list);
      } else {
        err = new Error(data.reason);
        err.code = data.code;
        this.emit('error', err);
      }
    } else {
      if (err) {
        return callback(err);
      }

      if (data.result === 'ok') {
        callback(null, data.data.list);
      } else {
        err = new Error(data.reason);
        err.code = data.code;
        callback(err);
      }
    }
  });
};

module.exports = Feedback;
