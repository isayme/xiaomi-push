var Stats = require('../lib').Stats;

var s = new Stats('your secret key');

s.getStats('20150801', '20150830', function(err, data) {
  if (err) {
    return console.log(err.message, err.code);
  }

  console.log(JSON.stringify(data));
});
