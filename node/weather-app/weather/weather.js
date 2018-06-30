const axios = require('axios');

var fetch = (lat, lng) => {
  const url = 'https://api.darksky.net/forecast/0fa5a8fb0c7c7ca387702ed387d240e1/' + `${lat},${lng}?units=si`;

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        if (response.status === 200) {
          resolve({
            temperature: response.data.currently.temperature,
            apparent_temperature: response.data.currently.apparentTemperature
          });
        }
        throw new Error('Unable to connect to Forecast.io server.');
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

module.exports = {
  fetch
}