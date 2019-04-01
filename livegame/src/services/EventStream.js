// https://deepstreamhub.com/tutorials/guides/records/

// const deepstream = require('deepstream.io-client-js');
// const { DEEPSTREAM_HOST, DEEPSTREAM_PORT } = require('../config/params');
const mqtt = require('mqtt');
const { to } = require('../helpers/promises');
const { MOSQUITTO_HOST } = require('../config/params');

class EventStream {
  static getClient() {
    // return deepstream(`${DEEPSTREAM_HOST}:${DEEPSTREAM_PORT}`).login();
    return new Promise((resolve, reject) => {
      const client = mqtt.connect(`mqtt://${MOSQUITTO_HOST}`);
      client.on('connect', () => resolve(client));
      client.on('error', error => reject(error));
    });
  }

  static async postTo(channel, data) {
    const [error, client] = await to(this.getClient());

    if (error) throw error;

    return new Promise(( resolve, reject ) => {
      client.publish(channel, JSON.stringify(data), err => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });

    

    // return new Promise((resolve, reject) => {
    //   const record = this.getClient().record.getRecord(channel);
    //   record.set(data, error => reject(error));

    //   record.whenReady(readyRecord => {
    //     resolve(readyRecord.get());
    //   });
    // });
  }
}

module.exports = EventStream;
