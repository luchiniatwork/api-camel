'use strict';

var debug = require('debug')('sample:game-model');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var GameModel = function () {
};

GameModel.mapping = [
  'TeamScheduleResponse::gscd::g'
];

GameModel.prototype = new BaseModel();

GameModel.prototype.getArenaCity = function() {
  return this.get('ac');
};

GameModel.prototype.getAreaName = function() {
  return this.get('an');
};

GameModel.prototype.getArenaState = function() {
  return this.get('as');
};

module.exports = GameModel;