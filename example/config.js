module.exports = {
  production: true,
  restrictedPackageName: 'org.isayme.pushdemo',
  appSecret: 'fnMrpxXI+BsZEhnmz4OuWg==',
  regids: [
    'd//igwEhgBGCI2TG6lWqlGn8M1ph6bjr4BtnhCZRe0Rb8+ZP0k6fhlIdnC4N2w7hLrlThrzoYjG9In/wojTjsv0OemEa0YpmoWCTD8X7mCg='
  ],
  callback: function (err, body) {
    console.log(err)
    console.log(JSON.stringify(body, null, 2))
  }
}
