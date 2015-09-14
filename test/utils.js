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
