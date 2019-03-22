const amqp = require('amqplib/callback_api');
const {
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USER,
  RABBITMQ_PASS
} = require('../config/params');

class Queue {
  static getURL() {
    return `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
  }

  static push(key) {
    return this.publish('cache', { key });
  }

  static publish(queue, message) {
    return new Promise((resolve, reject) => {
      amqp.connect(this.getURL(), (error, connection) => {
        if (error) reject(error);

        connection.createChannel((error, channel) => {
          if (error) reject(error);

          channel.assertExchange(queue, 'fanout', { durable: false });
          channel.publish(queue, '', Buffer.from(JSON.stringify(message)));
          resolve(message);
        });
      });
    });
  }
}

module.exports = Queue;
