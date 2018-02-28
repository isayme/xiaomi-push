var util = require('util')
var EventEmitter = require('events').EventEmitter

var debug = require('debug')('mipush:feedback')

var constant = require('./constant')
var feedbackAPI = constant.feedbackAPI

var utils = require('./utils')

var Feedback = function (options) {
  debug('init feedback:', options)

  utils.parseOptions.call(this, options)

  EventEmitter.call(this)

  return this
}

util.inherits(Feedback, EventEmitter)

Feedback.prototype.start = function () {
  debug('start feedback service with interval: ' + this.options.interval)

  this.cancel()

  var self = this
  if (this.options.interval > 0) {
    var interval = this.options.interval * 1000
    this.interval = setInterval(function () {
      self.getInvalidRegIds().then(function (list) {
        self.emit('feedback', list)
      })
    }, interval)
  }

  return this
}

Feedback.prototype.cancel = function () {
  debug('cancel feedback service')

  if (this.interval !== undefined) {
    clearInterval(this.interval)
    this.interval = undefined
  }
}

Feedback.prototype.request = function () {
  debug('do feedback request')

  return utils.get.call(this, feedbackAPI).then(function (body) {
    return body.data.list
  })
}
Feedback.prototype.getInvalidRegIds = Feedback.prototype.request

module.exports = Feedback
