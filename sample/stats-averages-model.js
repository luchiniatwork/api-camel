'use strict';

var debug = require('debug')('sample:team-schedule-response');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var StatsAveragesModel = function () {
  BaseModel.call(this);
};

StatsAveragesModel.mapping = [
  'PlayerCardResponse::pl::ca',
  'PlayerCardResponse::pl::ca::sa'
];

StatsAveragesModel.prototype = new BaseModel();

StatsAveragesModel.prototype.getGamesPlayed = function() {
  return this.get('gp')
};

StatsAveragesModel.prototype.getPoints = function() {
  return this.get('pts')
};

StatsAveragesModel.prototype.getRebounds = function() {
  return this.get('reb')
};

StatsAveragesModel.prototype.getAssists = function() {
  return this.get('ast')
};

StatsAveragesModel.prototype.getBlocks = function() {
  return this.get('blk')
};

StatsAveragesModel.prototype.getSteals = function() {
  return this.get('stl')
};

StatsAveragesModel.prototype.getMinutes = function() {
  return this.get('min')
};

StatsAveragesModel.prototype.getSeasonAverages = function() {
  return this.get('sa')
};

StatsAveragesModel.prototype.getSeason = function() {
  return this.get('val')
};

StatsAveragesModel.prototype.getTeamAbbreviation = function() {
  return this.get('ta')
};

StatsAveragesModel.prototype.getTeamName = function() {
  return this.get('tn')
};

StatsAveragesModel.prototype.getTeamCity = function() {
  return this.get('tc')
};

StatsAveragesModel.prototype.getTeamID = function() {
  return this.get('tid')
};

module.exports = StatsAveragesModel;