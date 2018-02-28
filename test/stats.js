var moment = require('moment')
var expect = require('chai').expect

var Stats = require('..').Stats
var config = require('../example/config')
var xiaomiMocker = require('./xiaomi-mocker')

var stats = new Stats({
  appSecret: config.appSecret,
  production: config.production,
  restrictedPackageName: config.restrictedPackageName
})

describe('Stats::construct', function () {
  it('should throw if restrictedPackageName missed', function () {
    expect(function () {
      /* eslint-disable no-new */
      new Stats({
        appSecret: config.appSecret,
        production: config.production
      })
    }).to.throw('options.restrictedPackageName required')
  })

  it('should throw if production missed', function () {
    expect(function () {
      /* eslint-disable no-new */
      new Stats({
        appSecret: config.appSecret,
        restrictedPackageName: config.restrictedPackageName
      })
    }).to.throw('this feature only vaild in production mode')
  })
})

describe('Stats::getStats', function () {
  it('should return sucess of getStats', function (done) {
    var startDate = moment()
      .subtract(6, 'days')
      .format('YYYYMMDD')
    var endDate = moment().format('YYYYMMDD')

    xiaomiMocker('getStats')
    stats.getStats(startDate, endDate, function (err, body) {
      expect(err).to.be.null()
      expect(body.data.data).to.be.instanceOf(Array)
      done()
    })
  })
})

describe('Stats::getAliasesOf', function () {
  it('should return sucess of getAliasesOf', function (done) {
    xiaomiMocker('getAliasesOf')
    stats.getAliasesOf(config.regids[0], function (err, body) {
      expect(err).to.be.null()
      expect(body.data.list).to.be.instanceof(Array)
      done()
    })
  })
})

describe('Stats::getTopicsOf', function () {
  it('should return sucess of getTopicsOf', function (done) {
    xiaomiMocker('getAliasesOf')
    stats.getTopicsOf(config.regids[0], function (err, body) {
      expect(err).to.be.null()
      expect(body.data.list).to.be.instanceof(Array)
      done()
    })
  })
})
