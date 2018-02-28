var nock = require('nock')

module.exports = {
  invalidSecret: function () {
    nock(/.*/)
      .get(/.*/)
      .reply(200, {
        result: 'error',
        reason: 'Invalid application secret.',
        trace_id: 'Xcm545545198200907134i',
        code: 21301,
        description: '认证失败'
      })
  },
  feedback: {
    getInvalidRegIds: function () {
      nock(/.*/)
        .get(/.*/)
        .reply(200, {
          result: 'ok',
          description: '成功',
          data: { list: ['regid1', 'regid2', 'regid3'] },
          code: 0
        })
    }
  },
  notification: {
    sendToRegid: function () {
      nock(/.*/)
        .post(/.*/)
        .reply(200, {
          result: 'ok',
          trace_id: 'Xdm011145198187915406b',
          code: 0,
          data: {
            id: 'sdm01114519818791543og'
          },
          description: '成功',
          info: 'Received push messages for 1 REGID'
        })
    }
  }
}
