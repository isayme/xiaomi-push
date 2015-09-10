module.exports = {
  production: true,
  restrictedPackageName: 'org.isayme.pushdemo',
  appSecret: 'fnMrpxXI+BsZEhnmz4OuWg==',
  regids: [
    'd//igwEhgBGCI2TG6lWqlGn8M1ph6bjr4BtnhCZRe0Rb8+ZP0k6fhlIdnC4N2w7hLrlThrzoYjG9In/wojTjsv0OemEa0YpmoWCTD8X7mCg='
  ],
  callback: function() {
    console.log(JSON.stringify(arguments, null, 2));
  }
};
