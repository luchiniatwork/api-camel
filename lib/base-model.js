'use strict';

var BaseModel = function () {
  this._data = {};
};

BaseModel.prototype.get = function(name) {
  return this._data[name];
};

BaseModel.prototype.set = function(name, value) {
  this._data[name] = value;
};

module.exports = BaseModel;