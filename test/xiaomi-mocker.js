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
  }
}
