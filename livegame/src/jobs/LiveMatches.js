const Footstats = require('../services/Footstats');
const Cache = require('../services/Cache');

class LiveMatches {
  static async run() {
    const key = 'live:matches';
    const matches = await Footstats.getLiveMatches();
    await Cache.set(key, JSON.stringify(matches));

    matches.forEach(match => {
      Cache.set(`matches:${match.id}`);
    });

    return matches;
  }
}

module.exports = LiveMatches;
