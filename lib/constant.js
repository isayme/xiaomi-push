var production = 'https://api.xmpush.xiaomi.com'
var sandbox = 'https://sandbox.xmpush.xiaomi.com'

module.exports = {
  feedbackAPI:
    'https://feedback.xmpush.xiaomi.com/v1/feedback/fetch_invalid_regids',
  statsAPI: production + '/v1/stats/message/counters',
  aliasStatsAPI: production + '/v1/alias/all',
  topicStatsAPI: production + '/v1/topic/all',
  tracerMessageAPI: production + '/v1/trace/message/status',
  tracerMessagesAPI: production + '/v1/trace/messages/status',
  notificationAPI: {
    regid: production + '/v2/message/regid',
    alias: production + '/v2/message/alias',
    account: production + '/v2/message/user_account',
    topic: production + '/v2/message/topic',
    multitopic: production + '/v2/message/multi_topic',
    all: production + '/v2/message/all'
  },
  notificationSandboxAPI: {
    regid: sandbox + '/v2/message/regid',
    alias: sandbox + '/v2/message/alias',
    account: sandbox + '/v2/message/user_account',
    topic: sandbox + '/v2/message/topic',
    multitopic: sandbox + '/v2/message/multi_topic',
    all: sandbox + '/v2/message/all'
  },
  tracerAPI: {
    subscribe: production + '/v2/topic/subscribe',
    unsubscribe: production + '/v2/topic/unsubscribe',
    subscribeAlias: production + '/v2/topic/subscribe/alias',
    unsubscribeAlias: production + '/v2/topic/unsubscribe/alias'
  },
  tracerSandboxAPI: {
    subscribe: sandbox + '/v2/topic/subscribe',
    unsubscribe: sandbox + '/v2/topic/unsubscribe',
    subscribeAlias: sandbox + '/v2/topic/subscribe/alias',
    unsubscribeAlias: sandbox + '/v2/topic/unsubscribe/alias'
  }
}
