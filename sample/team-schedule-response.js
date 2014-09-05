'use strict';

var debug = require('debug')('sample:team-schedule-response');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var TeamScheduleResponse = function () {
  BaseModel.call(this);
};

TeamScheduleResponse.mapping = [
  'TeamScheduleResponse'
];

TeamScheduleResponse.prototype = new BaseModel();

TeamScheduleResponse.prototype.getTeam = function() {
  return this.get('gscd')
};

TeamScheduleResponse.prototype.getGames = function() {
  return this.get('gscd').get('g');
};


module.exports = TeamScheduleResponse;