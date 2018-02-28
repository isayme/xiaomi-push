var expect = require('chai').expect
var moment = require('moment')
var config = require('../example/config')
var Message = require('../').Message
var Tracer = require('../').Tracer
var Notification = require('../').Notification

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
  it('should fail if invalid msgId', function (done) {
    tracer.getMessageStatus('invalid msgid', function (err, data) {
      expect(err).not.to.be.null()
      done()
    })
  })

  it('should sucess if valid msgId', function (done) {
    this.timeout(0)
    notification.sendToRegid(config.regids[0], msg, function (err, data) {
      expect(err).not.to.be.null()

      var msgid = data.id
      setTimeout(function () {
        tracer.getMessageStatus(msgid, function (err, data) {
          expect(err).to.be.null()
          expect(data.data.id).to.be.equal(msgid)
          done()
        })
      }, 10000)
    })
  })
})

describe('Tracer::getMessagesStatus', function () {
  it('should fail if invalid date format', function (done) {
    var startDate = moment().subtract(1, 'days')
    var endDate = moment()
    tracer.getMessagesStatus(startDate, endDate, function (err, data) {
      expect(err).not.to.be.null()

      // data.data is empty if fail
      expect(data.data).to.have.length(0)
      done()
    })
  })

  it('should success if valid date format', function (done) {
    var startDate = moment()
      .subtract(1, 'days')
      .valueOf()
    var endDate = moment().valueOf()
    tracer.getMessagesStatus(startDate, endDate, function (err, data) {
      expect(err).to.be.null()
      expect(data.data).be.instanceof(Array)
      done()
    })
  })
})

describe('Tracer::getMessageGroupStatus', function () {
  it('should fail if invalid jobkey', function (done) {
    tracer.getMessageGroupStatus('inkj', function (err, data) {
      expect(err).not.to.be.null()
      done()
    })
  })

  it('should sucess if valid jobkey', function (done) {
    tracer.getMessageGroupStatus('tjobkey', function (err, data) {
      expect(err).to.be.null()
      done()
    })
  })
})
