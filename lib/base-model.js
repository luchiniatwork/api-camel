'use strict';

var BaseModel = function () {
  this._data = {};
  this._rootLevel = false;
  this._depth = 0;
  this._metaObjs = null;
  this._metaObjIdx = null;
};

BaseModel.prototype.get = function(name) {
  return this._data[name];
};

BaseModel.prototype.set = function(name, value) {
  this._data[name] = value;
};

BaseModel.prototype.setRootLevel = function(value) {
  this._rootLevel = value;
};

BaseModel.prototype.isRootLevel = function() {
  return this._rootLevel;
};

BaseModel.prototype.setDepth = function(value) {
  this._depth = value;
};

BaseModel.prototype.getDepth = function() {
  return this._depth;
};

BaseModel.prototype.setMetaObjs = function(value) {
  this._metaObjs = value;
};

BaseModel.prototype.getMetaObjs = function() {
  return this._metaObjs;
};

BaseModel.prototype.setMetaObjIdx = function(value) {
  this._metaObjIdx = value;
};

BaseModel.prototype.getMetaObjIdx = function() {
  return this._metaObjIdx;
};

module.exports = BaseModel;