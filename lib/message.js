var Message = function() {
  this._data = {};
  return this;
};

/*
 * 设置要发送的消息内容payload.
 * 不允许全是空白字符, 长度小于4K, 中英文均以一个计算.
 */
Message.prototype.payload = function(payload) {
  return this.set('payload', payload);
};

/*
 * 设置在通知栏展示的通知的标题.
 * 不允许全是空白字符, 长度小于16, 中英文均以一个计算.
 */
Message.prototype.title = function(title) {
  return this.set('title', title);
};

/*
 * 设置在通知栏展示的通知的描述.
 * 不允许全是空白字符, 长度小于128, 中英文均以一个计算.
 */
Message.prototype.description = function(description) {
  return this.set('description', description);
};

/*
 * IOS 参数
 * 
 * String aps_proper_fields.title 在通知栏展示的通知的标题（支持iOS10及以上版本，如有该字段，会覆盖掉description字段）。
 * String aps_proper_fields.subtitle 展示在标题下方的子标题（支持iOS10及以上版本，如有该字段，会覆盖掉description字段）。
 * String aps_proper_fields.body 在通知栏展示的通知的内容（支持iOS10及以上版本，如有该字段，会覆盖掉description字段）。
 * String aps_proper_fields.mutable-content 通知可以修改选项，设置之后，在展示远程通知之前会进入Notification Service Extension中允许程序对通知内容修改（支持iOS10及以上版本）。
 */
Message.prototype.apsProperFields = function(key, value) {
  return this.set('aps_proper_fields.' + key, value);
};

/*
 * 设置消息是否通过透传的方式送给app.
 * 1表示透传消息, 0表示通知栏消息.
 */
Message.prototype.passThrough = function(passThrough) {
  return this.set('pass_through', passThrough);
};

/*
 * 设置通知类型, type的值可以是DEFAULT_ALL或者以下其他几种的OR组合：
 * DEFAULT_ALL = -1;
 * DEFAULT_SOUND  = 1;   // 使用默认提示音提示
 * DEFAULT_VIBRATE = 2;   // 使用默认震动提示
 * DEFAULT_LIGHTS = 4;    // 使用默认led灯光提示
 */
Message.prototype.notifyType = function(notifyType) {
  return this.set('notify_type', notifyType);
};

/*
 * 设置app的包名packageName. packageName必须和开发者网站上申请的结果一致.
 */
Message.prototype.restrictedPackageName = function(packageName) {
  return this.set('restricted_package_name', packageName);
};

/*
 * 可选项. 如果用户离线, 设置消息在服务器保存的时间, 单位：ms.
 * 服务器默认最长保留两周.
 */
Message.prototype.timeToLive = function(milliseconds) {
  return this.set('time_to_live', milliseconds);
};

/*
 * 可选项. 定时发送消息.
 * timeToSend是以毫秒为单位的时间戳. 注：仅支持七天内的定时消息.
 */
Message.prototype.timeToSend = function(timeToSend) {
  return this.set('time_to_send', timeToSend);
};

/*
 * 可选项. 默认情况下, 通知栏只显示一条推送消息
 * 如果通知栏要显示多条推送消息, 需要针对不同的消息设置不同的notify_id
 *（相同notify_id的通知栏消息会覆盖之前的）.
 */
Message.prototype.notifyId = function(id) {
  return this.set('notify_id', id);
};

/*
 * 可选项. 控制消息是否需要进行平缓发送（qps less 1000/second）. 默认不支持.
 * 0 表示不支持平缓发送; 1 表示支持平缓发送
 */
Message.prototype.enableFlowControl = function(needFlowControl) {
  return this.extra('flow_control', needFlowControl);
};

/*
 * 可选项, 对app提供一些扩展的功能.
 * 除了这些扩展功能, 开发者还可以定义一些key和value来控制客户端的行为.
 * 注：key和value的字符数不能超过1024, 至多可以设置10个key-value键值对.
 * sound_uri: 自定义通知栏消息铃声. extra.sound_uri的值设置为铃声的URI.
 * ticker: 开启通知消息在状态栏滚动显示.
 * notify_foreground: 开启/关闭app在前台时的通知弹出.
 *  当extra.notify_foreground值为"1"时, app会弹出通知栏消息；
 *  当extra.notify_foreground值为"0"时, app不会弹出通知栏消息.
 *  注：默认情况下会弹出通知栏消息.
 * notify_effect: 可选项，预定义通知栏消息的点击行为。
 *  1: 通知栏点击后打开app的Launcher Activity
 *  2: 通知栏点击后打开app的任一Activity(开发者还需要传入extra.intent_uri)
 *  3: 通知栏点击后打开网页(开发者还需要传入extra.web_uri)
 * intent_uri: 可选项, 打开当前app的任一组件
 * web_uri: 可选项, 打开某一个网页
 * flow_control: 参见Message.prototype.enableFlowControl说明
 * 更多可配置值参见: http://dev.xiaomi.com/doc/?p=533
 */
Message.prototype.extra = function(key, value) {
  // if (this._data.extra === undefined) {
  //   this.set('extra', {});
  // }
  //
  // this._data.extra[key] = value;
  this.set('extra.' + key, value);
  return this;
};

Message.prototype.set = function(key, value) {
  this._data[key] = value;
  return this;
};

Message.prototype.getData = function() {
  return this._data;
};

Message.prototype.toString = function() {
  return JSON.stringify(this._data);
};

module.exports = Message;
