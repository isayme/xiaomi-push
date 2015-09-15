var _ = require('lodash');
var expect = require('chai').expect;
var config = require('../example/config');
var Message = require('../').Message;
var Feedback = require('../').Feedback;

var feedback = new Feedback({
  appSecret: config.appSecret,
  interval: 10000,
  production: true
});

describe('Feedback::construct', function() {
  it('should throw if not configure with production', function() {
    expect(function() {
      var f = new Feedback({
        appSecret: config.appSecret
      });
    }).to.throw('this feature only vaild in production mode');
  });
});

describe('Feedback::start/cancel', function() {
  it('should work ok with start/cancel', function(done) {
    expect(feedback.interval).to.be.undefined;
    feedback.start();
    expect(feedback.interval).to.not.be.undefined;

    feedback.on('feedback', function(list) {
      expect(list).to.be.empty;
      feedback.cancel();
      expect(feedback.interval).to.be.undefined;
      done();
    });
  });
});

describe('Feedback::getInvalidRegIds', function() {
  it('should invoke callback if provided', function(done) {
    feedback.getInvalidRegIds(function(err, list) {
      expect(list).to.be.empty;
      done();
    });
  });
});
