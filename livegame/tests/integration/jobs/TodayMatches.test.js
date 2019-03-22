const TodayMatches = require('../../../src/jobs/TodayMatches');
const Cache = require('../../../src/services/Cache');
const { now } = require('../../../src/helpers/datetime');

describe("Test job to get today's matches", () => {
  it('should run the job', async () => {
    const { key, data } = await TodayMatches.run();

    expect(key)
      .to.be.a('string')
      .to.equal('matches:date:' + now('YYYYMMDD'));

    const cache = await Cache.get(key);

    return expect(JSON.parse(cache))
      .to.be.a('array')
      .to.have.lengthOf(data.length);
  });
});
