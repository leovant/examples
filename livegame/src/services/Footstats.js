const { FOOTSTATS_URL, FOOTSTATS_TOKEN } = require('../config/params');
const httpClient = require('./HttpClient');
const { to } = require('../helpers/promises');

// http://apifutebol.footstats.net/

class Footstats {
  static getUrl() {
    return FOOTSTATS_URL;
  }
  static getToken() {
    return FOOTSTATS_TOKEN;
  }
  static getHttpClient() {
    return httpClient;
  }

  static async getLiveMatches() {
    const endpoint = this.getEndpoint('partidas/temporeal');

    const { data } = await this.request(endpoint);

    return data;
  }

  static async getTodayMatches() {
    const endpoint = this.getEndpoint('partidas/hoje');

    const { data } = await this.request(endpoint);

    return data;
  }

  static async getMatchTimeline(matchId, lastCommentId = null) {
    const endpoint = this.getEndpoint(`partidas/${matchId}/narracoes`);

    const { data } = await this.request(endpoint, {
      ultimoIdNarracao: lastCommentId
    });

    return data;
  }

  static getMatch(matchId) {
    const endpoint = this.getEndpoint(`${matchId}`);

    return this.request(endpoint);
  }

  static getTeam(id) {
    const endpoint = this.getEndpoint(`equipes/${id}`);

    return this.request(endpoint);
  }

  static async request(endpoint, params = {}) {
    const headers = {
      Authorization: `Bearer ${this.getToken()}`
    };
    const [err, response] = await to(
      this.getHttpClient().get(endpoint, headers, params)
    );

    if (err) throw err;

    return response.data;
  }

  static getEndpoint(path) {
    return `${this.getUrl()}/${path}`;
  }
}

module.exports = Footstats;
