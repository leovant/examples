const LiveMatches = require('../../jobs/LiveMatches');
const MatchTimeline = require('../../jobs/MatchTimeline');
const { neverRejectAll, sorted } = require('../../helpers/promises');

async function start() {
  return LiveMatches.run().then(matches => {
    const queue = matches.map(match => MatchTimeline.runTo(match));
    return Promise.all(neverRejectAll(queue));
  });
}

module.exports = { start };
