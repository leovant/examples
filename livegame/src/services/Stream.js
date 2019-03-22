// https://deepstreamhub.com/tutorials/guides/records/

const deepstream = require('deepstream.io-client-js');
const { DEEPSTREAM_HOST, DEEPSTREAM_PORT } = require('../config/params');

class Stream {
  static getClient() {
    return deepstream(`${DEEPSTREAM_HOST}:${DEEPSTREAM_PORT}`).login();
  }

  static postTo(channel, data) {
    return new Promise((resolve, reject) => {
      const record = this.getClient().record.getRecord(channel);
      record.set(data, error => reject(error));

      record.whenReady(readyRecord => {
        resolve(readyRecord.get());
      });
    });
  }
}
