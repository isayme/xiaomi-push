var urllib = require('urllib');
var debug = require('debug')('mipush:utils');

var defaults = {
  production: false,
  timeout: 5000,
  gzip: true
};

function request(method, url, data, callback) {
  debug('request:', method, url, data);

  var options = {
    method: method,
    data: data,
    headers: {
      Authorization: 'key=' + this.options.appSecret
    },
    dataType: 'json',
    timeout: this.options.timeout,
    gzip: this.options.gzip
  };

  urllib.request(url, options, function(err, data) {
    debug('response:', err, data);

    if (err) {
      return callback(err);
    }

    // fail if data.code is 0
    if (data.code !== 0) {
      err = new Error(data.reason);
      err.code = data.code;
      return callback(err);
    }

    callback(null, data.data);
  });
}

module.exports.post = function(url, data, callback) {
  request.call(this, 'POST', url, data, callback);
};

module.exports.get = function(url, data, callback) {
  request.call(this, 'GET', url, data, callback);
};

/*
 * config: configure for MiPush
 * options: options for parseOptions
 *   supportSandbox: Boolean / does the feature has sandbox api, default false
 *
 */
module.exports.parseOptions = function(config, options) {
  if (!_.isObject(config)) {
    throw new Error('options must be Object.');
  }

  this.options = _.clone(defaults);
  _.assign(this.options, config);

  if (!_.isString(this.options.appSecret)) {
    throw new Error('options.appSecret required!');
  }
};
