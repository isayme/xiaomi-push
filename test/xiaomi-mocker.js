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
        id: 'scm51336519827468580b1'
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
        data: [
          {
            date: '20140428',
            single_recipients: 0,
            broadcast_recipients: 7689,
            received: 7026,
            click: 1703
          },
          {
            date: '20140429',
            single_recipients: 0,
            broadcast_recipients: 5129,
            received: 4642,
            click: 1256
          }
        ]
      },
      code: 0
    }
  },
  getAliasesOf: {
    response: {
      result: 'ok',
      code: 0,
      data: { list: ['XXXXXX', 'YYYYY'] },
      description: '成功'
    }
  },
  getMessageStatus: {
    response: {
      result: 'ok',
      trace_id: 'Xcm521145198274755965y',
      code: 0,
      data: {
        data: {
          create_time: '2018-02-28 22:17:48',
          invalid_target: 0,
          raw_counter: 0,
          click_rate: '0%',
          delivered: 0,
          click: 0,
          bar_closed: 0,
          device_condition_unmatch: 0,
          create_timestamp: 1519827468580,
          time_to_live: '1209600s',
          msg_type: 'Common',
          delivery_rate: '0%',
          id: 'scm51336519827468580b1',
          resolved: 0,
          app_not_register: 0
        }
      },
      description: '成功'
    }
  },
  getMessagesStatus: {
    response: {
      result: 'ok',
      trace_id: 'Xcm53586519827658479gh',
      code: 0,
      data: {
        data: []
      }
    }
  },
  getMessageGroupStatus: {
    response: {
      result: 'ok',
      trace_id: 'Xcm53586519827658479gh',
      code: 0,
      data: {
        data: []
      }
    }
  },
  subscribeTopic: {
    method: 'post',
    response: {
      result: 'ok',
      reason: 'Success',
      trace_id: 'Xdm00671519828734517Bt',
      code: 0,
      description: '成功'
    }
  }
}

module.exports = function (apiName) {
  const mockConfig = mockResponse[apiName]
  if (!mockConfig) {
    throw new Error(apiName + ' not supported')
  }
  const method = mockConfig.method || 'get'
  const response = mockConfig.response
  nock(/.*/)
    [method](/.*/)
    .reply(200, response)
}
