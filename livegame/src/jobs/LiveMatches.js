const Footstats = require('../services/Footstats');
const Cache = require('../services/Cache');
const Logger = require('../services/Logger');
const { neverRejectAll, to, sorted } = require('../helpers/promises');

class LiveMatches {
  static async run() {
    this.debug('Started');

    const [footstatsError, matches] = await to(Footstats.getLiveMatches());

    this.debug('Retrieved Footstats data');

    if (footstatsError) throw footstatsError;

    const [cacheError] = await to(Cache.set('matches:live', matches));

    if (cacheError) throw cacheError;

    const queue = matches.map(match => Cache.set(`matches:${match.id}`, match));

    const cacheResult = await Promise.all(neverRejectAll(queue));
    const { errors, success } = sorted(cacheResult);

    this.debug(
      `Updated cache of ${success.length} matches and got ${
        errors.length
      } errors`
    );

    if (errors.length > 0) throw new Error(errors);

    return matches;
  }

  static debug(message) {
    const processData = {
      pid: process.pid,
      cwd: process.cwd(),
      argv: process.argv
    };
    Logger.debug({ job: 'LiveMatches', message, process: processData });
  }
}

module.exports = LiveMatches;
