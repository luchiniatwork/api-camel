'use strict';

var debug = require('debug')('sample:nba-endpoints');

var apiCamel = require('../lib/index');
var BaseEndpoints = apiCamel.BaseEndpoints;

var TeamScheduleResponse = require('./team-schedule-response'),
    GameModel = require('./game-model'),
    TeamModel = require('./team-model'),
    BroadcasterModel = require('./broadcaster-model');

var NBAEndpoints = function () {
  debug('initializing NBAEndpoints');
  this._init({
    baseURL: 'http://data.nba.com/data/10s/v2014/json',
    modelList: [
      TeamScheduleResponse,
      GameModel,
      TeamModel,
      BroadcasterModel
    ]
  });
};

NBAEndpoints.prototype = new BaseEndpoints();

NBAEndpoints.prototype.getTeamSchedule = function(options) {

  options = options || {};
  options.league = options.league || 'dleague';
  options.season = options.season || '2013';
  options.team = options.team || 'energy';
  options.team = options.team.toLowerCase();
  options.seasonType = options.seasonType || 'REGULAR';

  debug('getTeamSchedule', JSON.stringify(options));

  var seasonTypeId = null;
  switch (options.seasonType) {
  case 'PRE-SEASON':
    seasonTypeId = '01';
    break;
  case 'REGULAR':
    seasonTypeId = '02';
    break;
  case 'PLAYOFFS':
    seasonTypeId = '04';
    break;
  }

  var endpoint = [
    'mobile_teams',
    options.league,
    options.season,
    'teams',
    [
      options.team,
      'schedule',
      seasonTypeId
    ].join('_') + '.json'
  ].join('/');
  
  debug('using endpoint', endpoint);
  
  return this._request({
    endpoint: endpoint,
    modelMapId: 'TeamScheduleResponse'
  });
};

module.exports = NBAEndpoints;