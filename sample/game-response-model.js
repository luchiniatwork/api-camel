'use strict';

var debug = require('debug')('sample:game-response-model');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var GameResponseModel = function () {
};

GameResponseModel.mapping = [
  'GameResponseModel'
]

GameResponseModel.prototype = new BaseModel();

module.exports = function () {
  return GameResponseModel;
};