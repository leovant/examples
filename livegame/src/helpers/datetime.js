const moment = require('moment');

const now = mask => moment().format(mask);
const utc = mask =>
  moment()
    .utc()
    .format(mask);

module.exports = {
  now,
  utc
};
