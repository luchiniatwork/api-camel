'use strict';

var debug = require('debug')('sample:nba-endpoints');

var apiCamel = require('../lib/index');
var BaseEndpoints = apiCamel.BaseEndpoints;

var TeamScheduleResponse = require('./team-schedule-response'),
    GameModel = require('./game-model');

var NBAEndpoints = function () {
  debug('initializing NBAEndpoints');
  this._init({
    baseURL: 'http://data.nba.com/data/10s/v2014/json',
    modelList: [
      TeamScheduleResponse,
      GameModel
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

  debug('getTeamSchedule', JSON.stringify(options));
  
  var endpoint = [
    'mobile_teams',
    options.league,
    options.season,
    'teams',
    options.team + '_schedule_02.json'
  ].join('/');
  
  return this._request({
    endpoint: endpoint,
    modelMapId: 'TeamScheduleResponse'
  });
};

module.exports = NBAEndpoints;