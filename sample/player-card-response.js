'use strict';

var debug = require('debug')('sample:team-schedule-response');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var PlayerCardResponse = function () {
  BaseModel.call(this);
};

PlayerCardResponse.mapping = [
  'PlayerCardResponse'
];

PlayerCardResponse.prototype = new BaseModel();

PlayerCardResponse.prototype.getPlayerCard = function() {
  return this.get('pl')
};

module.exports = PlayerCardResponse;