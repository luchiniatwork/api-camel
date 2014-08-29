'use strict';

var debug = require('debug')('sample:team-schedule-response');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var TeamScheduleResponse = function () {
};

TeamScheduleResponse.mapping = [
  'TeamScheduleResponse'
];

TeamScheduleResponse.prototype = new BaseModel();

TeamScheduleResponse.prototype.getTeamName = function() {
  return this.get('gscd').get('tn');
};

TeamScheduleResponse.prototype.getTeamAbbreviation = function() {
  return this.get('gscd').get('ta');
};

TeamScheduleResponse.prototype.getTeamCity = function() {
  return this.get('gscd').get('tc');
};

TeamScheduleResponse.prototype.getTeamId = function() {
  return this.get('gscd').get('tid');
};

TeamScheduleResponse.prototype.getGames = function() {
  return this.get('gscd').get('g');
};


module.exports = TeamScheduleResponse;