# xiaomi-push
> 小米推送服务Node版SDK, 欢迎提issue/pull request~

官方未提供Node版的SDK, 此SDK依照官方文档[小米推送服务Server端SDK (MiPushServiceSDK for server)](http://dev.xiaomi.com/doc/?p=533)实现.

目前只实现Android相关部分, 未考虑IOS相关接口.

# 支持的特性
- Message: 用于构建要发送的消息内容
- Stats: 获取发送的消息统计数据
- Feedback: 获取反馈信息, 比如失效的regId列表. 注: 官方API目前仅支持安卓设备
- Notification: 通知发送相关
- Tracer: 状态跟踪
- Subscription: (取消)订阅标签

# 安装及使用

    npm install xiaomi-push --save


使用示例可以参看[example](./example).

# API说明
> 这个...

# 联系我
`email`: `isaymeorg@mail.com`
