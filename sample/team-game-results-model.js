'use strict';

var debug = require('debug')('sample:team-game-results-model');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var TeamGameResultsModel = function () {
  BaseModel.call(this);
};

TeamGameResultsModel.mapping = [
  { 'TeamScheduleResponse::gscd::g::h': 'homeTeamResults' },
  { 'TeamScheduleResponse::gscd::g::v': 'visitingTeamResults' }
];

TeamGameResultsModel.prototype = new BaseModel();

TeamGameResultsModel.prototype.getScore = function() {
  return this.get('s');
};

TeamGameResultsModel.prototype.getRecord = function() {
  return this.get('re');
};

module.exports = TeamGameResultsModel;