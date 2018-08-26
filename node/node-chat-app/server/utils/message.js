const moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    created_at: moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, long) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    created_at: moment().valueOf()
  };
};

module.exports = { generateMessage, generateLocationMessage };
