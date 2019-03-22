const Footstats = require('../services/Footstats');
const Cache = require('../services/Cache');
const Queue = require('../services/Queue');

class LiveMatches {
  static async run() {
    const key = 'matches:live';
    const matches = await Footstats.getLiveMatches();
    await Cache.set(key, JSON.stringify(matches));
    await Queue.push(key);
    return { key, data: matches };
  }
}

module.exports = LiveMatches;
