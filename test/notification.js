var _ = require('lodash')
var expect = require('chai').expect
var config = require('./config')
var Message = require('../').Message
var Notification = require('../').Notification
var xiaomiMocker = require('./xiaomi-mocker')

var msg = new Message()
msg
  .title('title example')
  .description('description example')
  .payload('payload description')
  .passThrough(0)
  .notifyType(-1)
  .extra('badge', 6)

var notification = new Notification({
  appSecret: config.appSecret,
  production: true
})

describe('Notification::construct', function () {
  it('should return offical api if production is true', function () {
    var n = new Notification({
      appSecret: config.appSecret,
      production: true
    })

    _.all(_.values(n.apis), function (api) {
      expect(api).to.have.string('https://api.xmpush.xiaomi.com')
    })
  })

  it('should return sandbox api if production is false', function () {
    var n = new Notification({
      appSecret: config.appSecret,
      production: false
    })

    _.all(_.values(n.apis), function (api) {
      expect(api).to.have.string('https://sandbox.xmpush.xiaomi.com')
    })
  })
})

describe('Notification::sendToRegid', function () {
  it('should sucess if send to valid regid', function * () {
    xiaomiMocker('sendToRegid')
    let body = yield notification.sendToRegid(config.regids[0], msg)
    expect(body.code).to.be.equal(0)
  })
})

describe('Notification::sendToAlias', function () {
  it('should sucess if send to alias', function * () {
    xiaomiMocker('sendToRegid')
    let body = yield notification.sendToAlias('aliasName', msg)
    expect(body.code).to.be.equal(0)
  })
})

describe('Notification::sendToTopic', function () {
  it('should sucess if send to topic', function * () {
    xiaomiMocker('sendToRegid')
    let body = yield notification.sendToTopic('topicName', msg)
    expect(body.code).to.be.equal(0)
  })
})

describe('Notification::sendToAll', function () {
  it('should sucess if send to all', function * () {
    xiaomiMocker('sendToRegid')
    let body = yield notification.sendToAll(msg)
    expect(body.code).to.be.equal(0)
  })
})
