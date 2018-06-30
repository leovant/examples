// const request = require('request');
const axios = require('axios');

var geocodeAddress = (address) => {
  const encodedAddress = encodeURIComponent(address);
  const url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

  return new Promise((resolve, reject) => {

    axios.get(url)
      .then((response) => {
        if (response.data.status === 'OK') {
          resolve({
            address: response.data.results[0].formatted_address,
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
          });
        }
        if (response.data.status === 'ZERO_RESULTS') {
          throw new Error('Unable to find the address.');
        }
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') {
          reject('Unable to connect to Google API.')
        }
        reject(e.message);
      });
  });
};

module.exports = {
  geocodeAddress
}