const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const {
  ENV,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  TEAM_ID
} = require('../config/params');
const { utc } = require('../helpers/datetime');

class Logger {
  static getLogger() {
    const console = new winston.transports.Console({
      timestamp: () => {
        return utc('YYYY-MM-DD HH:mm:ss');
      },
      json: false,
      level: 'debug'
    });
    const cloudWatch = new WinstonCloudWatch({
      logGroupName: 'Sportech',
      logStreamName: `Schedulers-${ENV}` + (TEAM_ID ? `-${TEAM_ID}` : ''),
      awsAccessKeyId: AWS_ACCESS_KEY_ID,
      awsSecretKey: AWS_SECRET_ACCESS_KEY,
      awsRegion: AWS_REGION,
      level: 'error',
      jsonMessage: true
    });

    const logger = winston.createLogger({
      exitOnError: false,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    });
    //logger.add(cloudWatch);

    if (ENV !== 'production') {
      logger.add(console);
    }
    return logger;
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

  static debug(...info) {
    this.getLogger().log('debug', ...info);
  }
}

module.exports = Logger;
