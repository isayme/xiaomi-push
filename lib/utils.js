var _ = require('lodash')
var request = require('request')
var debug = require('debug')('mipush:utils')

var defaults = {
  production: false,
  timeout: 5000,
  gzip: true,
  keepAlive: false
}

var defaultPool = { maxSockets: 100 }

function requester (method, url, form, callback) {
  debug('requester:', method, url, form)

  var options = {
    uri: url,
    method: method,
    json: true,
    // 小米API是form表单
    form: form,
    headers: {
      Authorization: 'key=' + this.options.appSecret
    },
    timeout: this.options.timeout,
    gzip: this.options.gzip
  }

  if (this.options.keepAlive) {
    options.forever = true
    options.pool = this.options.pool || defaultPool
  }

  request(options, function (err, res, body) {
    debug('response:', err, body)

    if (err) {
      return callback(err)
    }

    // fail if body.code isnot 0
    if (body.code !== 0) {
      err = new Error(JSON.stringify(body.reason))
      return callback(err)
    }

    callback(null, body)
  })
}

module.exports.post = function (url, data, callback) {
  requester.call(this, 'POST', url, data, callback)
}

module.exports.get = function (url, data, callback) {
  requester.call(this, 'GET', url, data, callback)
}

/*
 * config: configure for MiPush
 * opts: options for parseOptions
 *   supportSandbox: Boolean / does the feature has sandbox api, default false
 *   requirePackageName: Boolean / does the feature need packageName, default false
 */
module.exports.parseOptions = function (config, opts) {
  opts = opts || {
    supportSandbox: false,
    requirePackageName: false
  }

  if (!_.isObject(config)) {
    throw new Error('options must be Object')
  }

  this.options = _.clone(defaults)
  _.assign(this.options, config)

  if (!_.isString(this.options.appSecret)) {
    throw new Error('options.appSecret required')
  }

  if (!opts.supportSandbox && !this.options.production) {
    throw new Error('this feature only vaild in production mode')
  }

  if (opts.requirePackageName && !this.options.restrictedPackageName) {
    throw new Error('options.restrictedPackageName required')
  }
}
