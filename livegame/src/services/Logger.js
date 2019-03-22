const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const {
  ENV,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} = require('../config/params');
const { utc } = require('../helpers/datetime');

class Logger {
  static getLogger() {
    winston.configure({
      exitOnError: false,
      levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7
      },
      colors: {
        emerg: 'bgRed',
        alert: 'bgMagenta',
        crit: 'bgRed',
        error: 'red',
        warning: 'yellow',
        notice: 'bgBlue',
        info: 'green',
        debug: 'white'
      },
      transports: [
        new WinstonCloudWatch({
          logGroupName: 'Sportech',
          logStreamName: `Schedulers-${ENV}`,
          awsAccessKeyId: AWS_ACCESS_KEY_ID,
          awsSecretKey: AWS_SECRET_ACCESS_KEY,
          awsRegion: AWS_REGION
        })
      ]
    });

    if (ENV !== 'production') {
      winston.add(
        new winston.transports.Console({
          timestamp: () => {
            return utc('YYYY-MM-DD HH:mm:ss');
          },
          json: false,
          colorize: true,
          level: 'debug'
        })
      );
    }
    return winston;
  }

  static emerg(...emerg) {
    this.getLogger().log('emerg', ...emerg);
  }

  static alert(...alert) {
    this.getLogger().log('alert', ...alert);
  }

  static crit(...crit) {
    this.getLogger().log('crit', ...crit);
  }

  static error(...error) {
    this.getLogger().log('error', ...error);
  }

  static warning(...warning) {
    this.getLogger().log('warning', ...warning);
  }

  static notice(...notice) {
    this.getLogger().log('notice', ...notice);
  }

  static info(...info) {
    this.getLogger().log('info', ...info);
  }
}

module.exports = Logger;
