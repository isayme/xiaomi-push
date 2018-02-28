var _ = require('lodash')
var expect = require('chai').expect

var Subscription = require('..').Subscription
var Stats = require('..').Stats
var config = require('../example/config')

var subscription = new Subscription({
  appSecret: config.appSecret,
  production: config.production
})

var stats = new Stats({
  appSecret: config.appSecret,
  production: config.production,
  restrictedPackageName: config.restrictedPackageName
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
  it('shuold work(the request will pass even regid not valid)', function (done) {
    subscription.subscribeTopic(config.regids[0], 'subtopic', null, function (err, data) {
      expect(err).to.be.null()
      stats.getTopicsOf(config.regids[0], function (err, data) {
        expect(err).to.be.null()
        expect(data.list).to.include('subtopic')
        done()
      })
    })
  })
})

describe('Subscription::unsubscribeTopic', function () {
  it('shuold work(the request will pass even regid not valid)', function (done) {
    subscription.unsubscribeTopic(config.regids[0], 'subtopic', null, function (err, data) {
      expect(err).to.be.null()
      stats.getTopicsOf(config.regids[0], function (err, data) {
        expect(err).to.be.null()
        expect(data.list).not.to.include('subtopic')
        done()
      })
    })
  })
})

describe('Subscription::subscribeTopicByAlias', function () {
  it('shuold work', function (done) {
    subscription.subscribeTopicByAlias('subalias', 'subtopic', null, function (err, data) {
      expect(err).to.be.null()
      done()
    })
  })
})

describe('Subscription::unsubscribeTopicByAlias', function () {
  it('shuold work', function (done) {
    subscription.unsubscribeTopicByAlias('subalias', 'subtopic', null, function (err, data) {
      expect(err).to.be.null()
      done()
    })
  })
})
