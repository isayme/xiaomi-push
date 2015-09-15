var expect = require('chai').expect;
var config = require('../example/config');
var utils = require('../lib/utils');

describe('parseOptions', function() {
  it('should throw if no required params', function() {
    var ins = {};

    expect(function() {
      utils.parseOptions.call(ins);
    }).to.throw('options must be Object');
  });

  it('should throw if no appSecret', function() {
    var ins = {};

    expect(function() {
      utils.parseOptions.call(ins, {});
    }).to.throw('options.appSecret required');
  });

  it('should throw if supportSandbox isnt true', function() {
    var ins = {};

    expect(function() {
      utils.parseOptions.call(ins, {appSecret: config.appSecret});
    }).to.throw('this feature only vaild in production mode');
  });

  it('should not throw if supportSandbox isnt true but production is true', function() {
    var ins = {};

    utils.parseOptions.call(ins, {
      appSecret: config.appSecret,
      production: true
    });

    expect(ins.options.production).to.be.true;
    expect(ins.options.appSecret).to.be.equal(config.appSecret);
  });

  it('should throw if requirePackageName is true', function() {
    var ins = {};

    expect(function() {
      utils.parseOptions.call(ins, {
        appSecret: config.appSecret,
        production: true
      }, {
        requirePackageName: true
      });
    }).to.throw('options.restrictedPackageName required');
  });

  it('should not throw if requirePackageName is true with options', function() {
    var ins = {};

    utils.parseOptions.call(ins, {
      appSecret: config.appSecret,
      production: true,
      restrictedPackageName: config.restrictedPackageName
    }, {
      requirePackageName: true
    });

    expect(ins.options.restrictedPackageName).to.be.equal(config.restrictedPackageName);
  });

  it('should return default options', function() {
    var ins = {};
    utils.parseOptions.call(ins, {
      appSecret: config.appSecret,
      production: true
    });

    expect(ins.options.production).to.be.true;
    expect(ins.options.gzip).to.be.true;
    expect(ins.options.timeout).to.be.equal(5000);
  })
});
