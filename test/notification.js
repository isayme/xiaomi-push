var _ = require('lodash');
var expect = require('chai').expect;
var config = require('../example/config');
var Notification = require('../').Notification;

describe('construct', function() {
  it('should return offical api if production is true', function() {
    var n = new Notification({
      appSecret: config.appSecret,
      production: true
    });

    _.all(_.values(n.apis), function(api) {
      expect(api).to.have.string('https://api.xmpush.xiaomi.com');
    });
  });

  it('should return sandbox api if production is false', function() {
    var n = new Notification({
      appSecret: config.appSecret,
      production: false
    });

    _.all(_.values(n.apis), function(api) {
      expect(api).to.have.string('https://sandbox.xmpush.xiaomi.com');
    });
  });
});
