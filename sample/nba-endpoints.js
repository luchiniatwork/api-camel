var apiCamel = require('../lib/index');
var BaseEndpoints = apiCamel.BaseEndpoints();

var NBAEndpoints = function () {
  this._init({
    baseURL: 'http://data.nba.com/data/10s/v2014/json'
  });
};

NBAEndpoints.prototype = new BaseEndpoints();

NBAEndpoints.prototype.getTeamSchedule = function(options) {
  options = options || {};
  options.league = options.league || 'dleague';
  options.season = options.season || '2013';
  options.team = options.team || 'energy';
  options.team = options.team.toLowerCase();
  
  var endpoint = [
    'mobile_teams',
    options.league,
    options.season,
    'teams',
    options.team + '_schedule_02.json'
  ].join('/');
  
  return this._request({
    endpoint: endpoint
  });
};

module.exports = {
  instance: function () {
    return new NBAEndpoints();
  }
};