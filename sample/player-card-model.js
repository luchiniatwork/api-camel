'use strict';

var debug = require('debug')('sample:team-schedule-response');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var PlayerCardModel = function () {
  BaseModel.call(this);
};

PlayerCardModel.mapping = [
  'PlayerCardResponse::pl'
];

PlayerCardModel.prototype = new BaseModel();

PlayerCardModel.prototype.getID = function() {
  return this.get('pid')
};

PlayerCardModel.prototype.getFirstName = function() {
  return this.get('fn')
};

PlayerCardModel.prototype.getLastName = function() {
  return this.get('ln')
};

PlayerCardModel.prototype.getDOB = function() {
  return this.get('dob')
};

PlayerCardModel.prototype.getHomeCity = function() {
  return this.get('hcc')
};

PlayerCardModel.prototype.getHeight = function() {
  return this.get('ht')
};

PlayerCardModel.prototype.getWeight = function() {
  return this.get('wt')
};

PlayerCardModel.prototype.getCareerAverages = function() {
  return this.get('ca')
};

module.exports = PlayerCardModel;