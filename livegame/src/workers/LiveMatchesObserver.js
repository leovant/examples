const CronJob = require('cron').CronJob;
const LiveMatches = require('../jobs/LiveMatches');
const MatchesTimeline = require('../jobs/MatchTimeline');
const { neverRejectAll } = require('../helpers/promises');
const { EVERY_30_SECONDS } = require('../helpers/constants');

async function start() {
  return LiveMatches.run().then(matches => {
    const queue = matches.map(match => {
      return MatchesTimeline.run(match);
    });
    return neverRejectAll(queue);
  });
}

module.exports = new CronJob(EVERY_30_SECONDS, start, null, true);
