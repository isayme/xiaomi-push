var expect = require('chai').expect
var moment = require('moment')
var config = require('../example/config')
var Message = require('../').Message
var Tracer = require('../').Tracer
var Notification = require('../').Notification
var xiaomiMocker = require('./xiaomi-mocker')

var msg = new Message()
msg
  .title('trace example')
  .description('description example')
  .payload('payload description')
  .passThrough(0)
  .notifyType(-1)
  .extra('badge', 6)
  .extra('jobkey', 'tjobkey')

var tracer = new Tracer({
  appSecret: config.appSecret,
  production: true
})

var notification = new Notification({
  appSecret: config.appSecret,
  production: true
})

describe('Tracer::construct', function () {
  it('should throw if production not provided', function () {
    expect(function () {
      /* eslint-disable no-new */
      new Tracer({
        appSecret: config.appSecret
      })
    }).to.throw('this feature only vaild in production mode')
  })
})

describe('Tracer::getMessageStatus', function () {
  it('should sucess if valid msgId', function * () {
    this.timeout(0)
    xiaomiMocker('sendToRegid')
    let body = yield notification.sendToRegid(config.regids[0], msg)
    var msgid = body.data.id

    xiaomiMocker('getMessageStatus')
    body = yield tracer.getMessageStatus(msgid)
    expect(body.data.data.id).to.be.equal(msgid)
  })
})

describe('Tracer::getMessagesStatus', function () {
  it('should success if valid date format', function * () {
    var startDate = moment()
      .subtract(1, 'days')
      .valueOf()
    var endDate = moment().valueOf()

    xiaomiMocker('getMessagesStatus')
    let body = yield tracer.getMessagesStatus(startDate, endDate)
    expect(body.data.data).be.instanceof(Array)
  })
})

describe('Tracer::getMessageGroupStatus', function () {
  it('should sucess if valid jobkey', function * () {
    xiaomiMocker('getMessagesStatus')
    let body = yield tracer.getMessageGroupStatus('tjobkey')
    expect(body.code).to.be.equal(0)
  })
})
