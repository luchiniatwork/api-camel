'use strict';

var debug = require('debug')('sample:game-model');

var apiCamel = require('../lib/index');
var BaseModel = apiCamel.BaseModel;

var GameModel = function () {
  BaseModel.call(this);
};

GameModel.mapping = [
  'TeamScheduleResponse::gscd::g'
];

GameModel.prototype = new BaseModel();

GameModel.prototype.getID = function() {
  return this.get('gid');
};

GameModel.prototype.getCode = function() {
  return this.get('gcode');
};

GameModel.prototype.getSeriesInfo = function() {
  return this.get('seri');
};

GameModel.prototype.isNecessary = function() {
  return this.get('is') === 1;
};

GameModel.prototype.getDate = function() {
  return this.get('gdte');
};

GameModel.prototype.getEasternTime = function() {
  return this.get('etm');
};

GameModel.prototype.getHomeTeamTime = function() {
  return this.get('htm');
};

GameModel.prototype.getVisitingTeamTime = function() {
  return this.get('vtm');
};

GameModel.prototype.getArenaCity = function() {
  return this.get('ac');
};

GameModel.prototype.getArenaName = function() {
  return this.get('an');
};

GameModel.prototype.getArenaState = function() {
  return this.get('as');
};

GameModel.prototype.getBroadcasters = function() {
  return this.get('bd').get('b');
};

GameModel.prototype.getEasternTime = function() {
  return this.get('etm');
};

GameModel.prototype.getHomeTeamTime = function() {
  return this.get('htm');
};

GameModel.prototype.getStatus = function() {
  var out = null
  switch(this.get('st')) {
    case '1':
      out = 'PRE-GAME';
      break;
    case '2':
      out = 'IN-PROGRESS';
      break;
    case '3':
      out = 'FINAL';
      break;
  }
  return out;
};

GameModel.prototype.getHomeTeam = function() {
  return this.get('homeTeam');
};

GameModel.prototype.getHomeTeamResults = function() {
  return this.get('homeTeamResults');
};

GameModel.prototype.getVisitingTeam = function() {
  return this.get('visitingTeam');
};

GameModel.prototype.getVisitingTeamResults = function() {
  return this.get('visitingTeamResults');
};

module.exports = GameModel;