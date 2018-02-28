module.exports = {
  production: true,
  restrictedPackageName: 'your package name',
  appSecret: 'your secret',
  regids: [
    'your regid'
  ],
  callback: function (err, body) {
    console.log(err)
    console.log(JSON.stringify(body, null, 2))
  }
}
