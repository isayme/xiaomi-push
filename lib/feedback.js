var util = require('util');
var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');
var debug = require('debug')('mipush:feedback');

var constant = require('./constant');
var feedbackAPI = constant.feedbackAPI;

var utils = require('./utils');

var Feedback = function(options) {
  debug('init feedback:', options);

  utils.parseOptions.call(this, options);

  EventEmitter.call(this);

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

  utils.get.call(this, feedbackAPI, undefined, function(err, data) {
    if (callback) {
      callback(err, data.list);
    } else {
      if (err) {
        this.emit('error', err);
      } else {
        this.emit('feedback', data.list);
      }
    }
  });
};
Feedback.prototype.getInvalidRegIds = Feedback.prototype.request;

module.exports = Feedback;
