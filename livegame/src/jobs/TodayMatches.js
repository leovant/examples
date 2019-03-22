const Footstats = require('../services/Footstats');
const Cache = require('../services/Cache');
const Queue = require('../services/Queue');

class TodayMatches {
  static async run() {
    const key = 'matches:today';
    const matches = await Footstats.getTodayMatches();
    await Cache.set(key, JSON.stringify(matches));
    await Queue.push(key);
    return { key, data: matches };
  }
}

module.exports = TodayMatches;
