const CronJob = require('cron').CronJob;
const observer = require('./observer');
const { EVERY_30_SECONDS } = require('../../helpers/constants');

module.exports = new CronJob(
  EVERY_30_SECONDS,
  () =>
    observer.start().catch(error => {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(error);
    }),
  null,
  true
);
