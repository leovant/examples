const axios = require('axios');

class HttpClient {
  static get(url, headers, params) {
    return axios({
      method: 'GET',
      url,
      params,
      headers
    });
  }
}

module.exports = HttpClient;
