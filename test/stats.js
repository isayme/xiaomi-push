var moment = require('moment');
var expect = require('chai').expect;

var Stats = require('..').Stats;
var config = require('../example/config');

var stats = new Stats({
  appSecret: config.appSecret,
  production: config.production,
  restrictedPackageName: config.restrictedPackageName
});

describe('Stats::construct', function() {
  it('should throw if restrictedPackageName missed', function() {
    expect(function() {
      new Stats({
        appSecret: config.appSecret,
        production: config.production
      });
    }).to.throw('options.restrictedPackageName required');
  });

  it('should throw if production missed', function() {
    expect(function() {
      new Stats({
        appSecret: config.appSecret,
        restrictedPackageName: config.restrictedPackageName
      });
    }).to.throw('this feature only vaild in production mode');
  });
});

describe('Stats::getStats', function() {
  it('should return fail of getStats if invalid date', function(done) {
    var startDate = moment().subtract(6, 'days').format('YYMMDD');
    var endDate = moment().format('YYMMDD');
    stats.getStats(startDate, endDate, function(err, data) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should return sucess of getStats', function(done) {
    var startDate = moment().subtract(6, 'days').format('YYYYMMDD');
    var endDate = moment().format('YYYYMMDD');
    stats.getStats(startDate, endDate, function(err, data) {
      expect(err).to.be.null;
      expect(data.data).to.have.length(7);
      done();
    });
  });
});

describe('Stats::getAliasesOf', function() {
  it('should return fail of getAliasesOf if invalid regid', function(done) {
    stats.getAliasesOf('invalid regid', function(err, data) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should return sucess of getAliasesOf', function(done) {
    stats.getAliasesOf(config.regids[0], function(err, data) {
      expect(err).to.be.null;
      expect(data.list).to.be.instanceof(Array);
      done();
    });
  });
});

describe('Stats::getTopicsOf', function() {
  it('should return fail of getTopicsOf if invalid regid', function(done) {
    stats.getTopicsOf('invalid regid', function(err, data) {
      expect(err).not.to.be.null;
      done();
    });
  });

  it('should return sucess of getTopicsOf', function(done) {
    stats.getTopicsOf(config.regids[0], function(err, data) {
      expect(err).to.be.null;
      expect(data.list).to.be.instanceof(Array);
      done();
    });
  });
});
