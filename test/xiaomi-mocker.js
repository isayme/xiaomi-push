var nock = require('nock')

module.exports = {
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
