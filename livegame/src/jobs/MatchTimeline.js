const Cache = require('../services/Cache');
const Footstats = require('../services/Footstats');
const Stream = require('../services/Stream');

class MatchTimeline {
  static async runTo(match) {
    let comments = await Footstats.getMatchTimeline(match.id);

    Cache.set(`matches:${match.id}:comments`);
    Stream.postTo(`live:matches:${match.id}`, { ...match, comments });

    return comments;
  }
}
