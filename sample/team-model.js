'use strict';

var debug = require('debug')('sample:team-model');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var TeamModel = function () {
  BaseModel.call(this);
};

TeamModel.mapping = [
  'TeamScheduleResponse::gscd',
  'TeamScheduleResponse::gscd::g::h',
  'TeamScheduleResponse::gscd::g::v',
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

TeamModel.prototype.getScore = function() {
  return this.get('s');
};

TeamModel.prototype.getRecord = function() {
  return this.get('re');
};

module.exports = TeamModel;