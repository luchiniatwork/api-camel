'use strict';

import Lance from '../lib/lance-rest';

import Metadata from './metadata-model';
import Airport from './airport-model';

import debug from 'debug';

var lance = new Lance({
  // baseURL: 'http://private-8fd90d-aeromex.apiary-mock.com',
  baseURL: 'http://localhost:8080',
  rootPath: '/',
  modelMap: {
    Metadata: Metadata,
    Airport: Airport
  }
});

lance.initialize().then(function() {
  // console.log(lance.metaModel().isServiceOperational('fareSearch'));
  
  lance.get('airport', { airportCode: 'MEX'} ).then(function(mexAirport) {
    console.log(mexAirport.smallCode());
  });
  
  // lance.get('airports').then(function(airports) {
  //   console.log(airports.collection()[0].smallCode());
  // });
});

// var debug = require('debug')('sample:nba-endpoints');
//
// var apiCamel = require('../lib/index');
// var BaseEndpoints = apiCamel.BaseEndpoints;
//
// var TeamScheduleResponse = require('./team-schedule-response'),
//     GameModel = require('./game-model'),
//     TeamModel = require('./team-model'),
//     TeamGameResultsModel = require('./team-game-results-model'),
//     BroadcasterModel = require('./broadcaster-model'),
//     PlayerCardModel = require('./player-card-model'),
//     StatsAveragesModel = require('./stats-averages-model');
//
// var NBAEndpoints = function () {
//   debug('initializing NBAEndpoints');
//   BaseEndpoints.call(this, {
//     baseURL: 'http://data.nba.com/data/10s/v2014/json',
//     modelList: [
//       TeamScheduleResponse,
//       GameModel,
//       TeamModel,
//       TeamGameResultsModel,
//       BroadcasterModel,
//       PlayerCardModel,
//       StatsAveragesModel
//     ]
//   });
// };
//
// NBAEndpoints.prototype = new BaseEndpoints();
//
// NBAEndpoints.prototype._seasonTypeId = function(seasonType) {
//   var seasonTypeId = null;
//   switch (seasonType) {
//   case 'PRE-SEASON':
//     seasonTypeId = '01';
//     break;
//   case 'REGULAR':
//     seasonTypeId = '02';
//     break;
//   case 'PLAYOFFS':
//     seasonTypeId = '04';
//     break;
//   }
//   return seasonTypeId
// };
//
// NBAEndpoints.prototype.getTeamSchedule = function(options) {
//
//   options = options || {};
//   options.league = options.league || 'dleague';
//   options.season = options.season || '2013';
//   options.team = options.team || 'energy';
//   options.team = options.team.toLowerCase();
//   options.seasonType = options.seasonType || 'REGULAR';
//
//   debug('getTeamSchedule', JSON.stringify(options));
//
//   var seasonTypeId = this._seasonTypeId(options.seasonType);
//
//   var endpoint = [
//     'mobile_teams',
//     options.league,
//     options.season,
//     'teams',
//     [
//       options.team,
//       'schedule',
//       seasonTypeId
//     ].join('_') + '.json'
//   ].join('/');
//
//   debug('using endpoint', endpoint);
//
//   return this._request({
//     endpoint: endpoint,
//     namespace: 'TeamScheduleResponse'
//   });
// };
//
// NBAEndpoints.prototype.getPlayerCard = function(options) {
//
//   options = options || {};
//   options.league = options.league || 'dleague';
//   options.season = options.season || '2013';
//   options.playerID = options.playerID || '';
//   options.seasonType = options.seasonType || 'REGULAR';
//
//   debug('getPlayerCard', JSON.stringify(options));
//
//   var seasonTypeId = this._seasonTypeId(options.seasonType);
//
//   var endpoint = [
//     'mobile_teams',
//     options.league,
//     options.season,
//     'players',
//     [
//       'playercard',
//       options.playerID,
//       seasonTypeId
//     ].join('_') + '.json'
//   ].join('/');
//
//   debug('using endpoint', endpoint);
//
//   return this._request({
//     endpoint: endpoint,
//     namespace: 'PlayerCardResponse'
//   });
// };
//
// module.exports = NBAEndpoints;