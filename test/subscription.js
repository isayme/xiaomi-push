var _ = require('lodash')
var expect = require('chai').expect

var Subscription = require('..').Subscription
var config = require('../example/config')
var xiaomiMocker = require('./xiaomi-mocker')

var subscription = new Subscription({
  appSecret: config.appSecret,
  production: config.production
})

describe('Subscription::construct', function () {
  it('should return offical api if production is true', function () {
    var n = new Subscription({
      appSecret: config.appSecret,
      production: true
    })

    _.all(_.values(n.apis), function (api) {
      expect(api).to.have.string('https://api.xmpush.xiaomi.com')
    })
  })

  it('should return sandbox api if production is false', function () {
    var n = new Subscription({
      appSecret: config.appSecret,
      production: false
    })

    _.all(_.values(n.apis), function (api) {
      expect(api).to.have.string('https://sandbox.xmpush.xiaomi.com')
    })
  })
})

describe('Subscription::subscribeTopic', function () {
  it('shuold work(the request will pass even regid not valid)', function * () {
    xiaomiMocker('subscribeTopic')
    let body = yield subscription.subscribeTopic(
      config.regids[0],
      'subtopic',
      null
    )
    expect(body.code).to.be.equal(0)
  })
})

describe('Subscription::unsubscribeTopic', function () {
  it('shuold work(the request will pass even regid not valid)', function * () {
    xiaomiMocker('subscribeTopic')
    let body = yield subscription.unsubscribeTopic(config.regids[0], 'subtopic')
    expect(body.code).to.be.equal(0)
  })
})

describe('Subscription::subscribeTopicByAlias', function () {
  it('shuold work', function * () {
    xiaomiMocker('subscribeTopic')
    let body = yield subscription.subscribeTopicByAlias('subalias', 'subtopic')
    expect(body.code).to.be.equal(0)
  })
})

describe('Subscription::unsubscribeTopicByAlias', function () {
  it('shuold work', function * () {
    xiaomiMocker('subscribeTopic')
    let body = yield subscription.unsubscribeTopicByAlias(
      'subalias',
      'subtopic'
    )
    expect(body.code).to.be.equal(0)
  })
})
