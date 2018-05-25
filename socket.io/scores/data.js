var MySportsFeeds = require('mysportsfeeds-node');

exports.getData = () => {
  let msf = new MySportsFeeds('1.1', true);
  let today = new Date();
  let fordate =
    today.getFullYear() +
    ('0' + parseInt(today.getMonth() + 1)).slice(-2) +
    ('0' + today.getDate()).slice(-2);

  msf.authenticate('leovant', 'leo123');

  return msf.getData('nba', '2017-2018-regular', 'scoreboard', 'json', {
    fordate: '20180411',
    force: true
  });
};
