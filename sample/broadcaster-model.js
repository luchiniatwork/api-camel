'use strict';

var debug = require('debug')('sample:broadcaster-model');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var BroadcasterModel = function () {
  BaseModel.call(this);
};

BroadcasterModel.mapping = [
  'TeamScheduleResponse::gscd::g::bd::b'
];

BroadcasterModel.prototype = new BaseModel();

BroadcasterModel.prototype.getSequence = function() {
  return this.get('seq');
};

BroadcasterModel.prototype.getDisplayName = function() {
  return this.get('disp');
};

BroadcasterModel.prototype.getLanguage = function() {
  return this.get('lan');
};

BroadcasterModel.prototype.getScope = function() {
  return this.get('scope');
};

BroadcasterModel.prototype.getType = function() {
  return this.get('type');
};

module.exports = BroadcasterModel;