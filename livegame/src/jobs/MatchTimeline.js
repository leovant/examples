const Footstats = require('../services/Footstats');

class MatchTimeline {
  static async runTo(matchId) {
    let lastComment = await Cache.get(`matches:live:${matchId}:lastComment`);
    lastComment = JSON.parse(lastComment);
    const lastCommentId = lastComment.id || null;

    let comments = await Footstats.getMatchTimeline(matchId, lastCommentId);
  }
}
