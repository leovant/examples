module.exports = {
  EVERY_01_SECOND: '* * * * * *',
  EVERY_05_SECONDS: '*/5 * * * * *',
  EVERY_15_SECONDS: '*/15 * * * * *',
  EVERY_30_SECONDS: '*/30 * * * * *',
  EVERY_60_SECONDS: '0 * * * * *',
  EVERY_MINUTE_AT: (min = 0) => `${min} * * * * *`,
  EVERY_5_MINUTES: '0 */5 * * * *',
  EVERY_15_MINUTES: '0 */15 * * * *',
  EVERY_01_HOUR: '0 0 * * * *',
  EVERY_01_DAY: '0 0 0 * * *',
  EVERY_DAY_AT: (hour = 0) => `0 0 ${hour} * * *`
};
