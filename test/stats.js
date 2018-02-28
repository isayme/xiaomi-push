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
  it('should return sucess of getStats', function * () {
    var startDate = moment()
      .subtract(6, 'days')
      .format('YYYYMMDD')
    var endDate = moment().format('YYYYMMDD')

    xiaomiMocker('getStats')
    let body = yield stats.getStats(startDate, endDate)
    expect(body.data.data).to.be.instanceOf(Array)
  })
})

describe('Stats::getAliasesOf', function () {
  it('should return sucess of getAliasesOf', function * () {
    xiaomiMocker('getAliasesOf')
    let body = yield stats.getAliasesOf(config.regids[0])
    expect(body.data.list).to.be.instanceof(Array)
  })
})

describe('Stats::getTopicsOf', function () {
  it('should return sucess of getTopicsOf', function * () {
    xiaomiMocker('getAliasesOf')
    let body = yield stats.getTopicsOf(config.regids[0])
    expect(body.data.list).to.be.instanceof(Array)
  })
})
