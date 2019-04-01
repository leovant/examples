const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { MOSQUITTO_HOST } = require('../src/config/params');

var mqtt = require('mqtt');

const matchId = process.argv[2];
const client = mqtt.connect(`mqtt://${MOSQUITTO_HOST}`);

if (!matchId) {
  console.error('You must provide a match id');
  process.exit(1);
}

client.on('connect', () => {
  console.info('Connected to server');
  client.subscribe(`matches:live:${matchId}`, err => {
    if (err) {
      console.error('Could not subscribe to channel ');
      console.error(err);
      process.exit(1);
    }
  });
});

client.on('message', (topic, message) => {
  console.log(topic, message.toString());
  client.end();
});
