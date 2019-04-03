const mqtt = require('mqtt');
const { to } = require('../helpers/promises');
const { MOSQUITTO_HOST } = require('../config/params');

class EventStream {
  static getClient() {
    return new Promise((resolve, reject) => {
      const client = mqtt.connect(`mqtt://${MOSQUITTO_HOST}`);
      client.on('connect', () => resolve(client));
      client.on('error', error => reject(error));
    });
  }

  static async postTo(channel, data) {
    const [error, client] = await to(this.getClient());

    if (error) throw error;

    return new Promise((resolve, reject) => {
      client.publish(channel, JSON.stringify(data), err => {
        if (err) {
          return reject(err);
        }
        client.end();
        resolve(data);
      });
    });
  }
}

module.exports = EventStream;
