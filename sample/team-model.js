'use strict';

var debug = require('debug')('sample:team-model');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var TeamModel = function () {
  BaseModel.call(this);
};

TeamModel.mapping = [
  'TeamScheduleResponse::gscd',
  { 'TeamScheduleResponse::gscd::g::h': 'homeTeam' },
  { 'TeamScheduleResponse::gscd::g::v': 'visitingTeam' }
];

TeamModel.prototype = new BaseModel();

TeamModel.prototype.getAbbreviation = function() {
  return this.get('ta');
};

TeamModel.prototype.getCity = function() {
  return this.get('tc');
};

TeamModel.prototype.getName = function() {
  return this.get('tn');
};

TeamModel.prototype.getID = function() {
  return this.get('tid');
};

module.exports = TeamModel;