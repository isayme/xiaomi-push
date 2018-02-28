var nock = require('nock')

const mockResponse = {
  invalidSecret: {
    response: {
      result: 'error',
      reason: 'Invalid application secret.',
      trace_id: 'Xcm545545198200907134i',
      code: 21301,
      description: '认证失败'
    }
  },
  getInvalidRegIds: {
    response: {
      result: 'ok',
      description: '成功',
      data: { list: ['regid1', 'regid2', 'regid3'] },
      code: 0
    }
  },
  sendToRegid: {
    method: 'post',
    response: {
      result: 'ok',
      trace_id: 'Xdm011145198187915406b',
      code: 0,
      data: {
        id: 'sdm01114519818791543og'
      },
      description: '成功',
      info: 'Received push messages for 1 REGID'
    }
  },
  getStats: {
    response: {
      result: 'ok',
      description: '成功',
      data: {
        data:
          '[ {"date":"20140428","single_recipients":0,"broadcast_recipients":7689,"received":7026,"click":1703}, {"date":"20140429","single_recipients":0,"broadcast_recipients":5129,"received":4642,"click":1256} ]'
      },
      code: 0
    }
  }
}

module.exports = function (apiName) {
  const mockConfig = mockResponse[apiName]
  if (!mockConfig) {
    throw new Error(apiName + ' not supported')
  }
  const method = mockConfig.method || 'get'
  nock(/.*/)[method](/.*/).reply(200, mockConfig.response)
}
