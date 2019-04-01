const Cache = require('../services/Cache');
const Footstats = require('../services/Footstats');
const EventStream = require('../services/EventStream');
const { to } = require('../helpers/promises');

class MatchTimeline {
  static async runTo(match) {
    const [footstatsError, comments] = await to(
      Footstats.getMatchTimeline(match.id)
    );

    if (footstatsError) throw footstatsError;

    Cache.set(`matches:${match.id}`, { ...match, comments });
    EventStream.postTo(`matches:live:${match.id}`, { ...match, comments });

    return comments;
  }
}

module.exports = MatchTimeline;
