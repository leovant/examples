const { promisify } = require('util');
const { createClient } = require('redis');
const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = require('../config/params');

class Cache {
  static getClient() {
    if (this.client) return this.client;

    this.client = createClient({ host: REDIS_HOST, port: REDIS_PORT });

    if (REDIS_PASS) {
      this.client.auth(REDIS_PASS, err => {
        if (err) throw err;
      });
    }
    return this.client;
  }

  static set(key, value) {
    const setAsync = promisify(this.getClient().set).bind(this.getClient());

    return setAsync(key, value);
  }

  static get(key) {
    const getAsync = promisify(this.getClient().get).bind(this.getClient());

    return getAsync(key);
  }
}

module.exports = Cache;
