'use strict';

var BaseEndpoints = function () {
  this._a = 1;
};

BaseEndpoints.prototype.printA = function () {
  console.log(this._a);
};

BaseEndpoints.prototype._init = function (modelList) {
  this._$http = require('http');
  this._$q = require('q');
  this._modelList = modelList;
};

BaseEndpoints.prototype._getModelConstructor = function (modelMapId) {
  var out = null;
  for (var modelIdx in this._modelList) {
    var mapIds = this._modelList[modelIdx].mapping;
    if (!angular.isArray(mapIds)) {
      mapIds = [mapIds];
    }
    for (var mapIdx in mapIds) {
      var mapRegexp = new RegExp('^' + mapIds[mapIdx] + '$');
      if (mapRegexp.test(modelMapId)) {
        out = this._modelList[modelIdx];
        break;
      }
    }
    if (out) {
      break;
    }
  }
  return out;
};

BaseEndpoints.prototype._buildModel = function (src, modelMapId) {
  var model = null;
  var modelConstructor = this._getModelConstructor(modelMapId);

  if (src) {
    if (angular.isArray(src)) {
      model = [];
    } else if (angular.isObject(src)) {
      if (modelConstructor) {
        // ignoring jshint here because it complains about the
        // small caps on the indentifier but I like it like this
        // exactly because it reminds us this is a meta-constructor
        model = new modelConstructor(); // jshint ignore:line
      } else {
        model = {};
      }
    }
    
    for (var key in src) {
      var val = src[key];
      if (
        angular.isObject(val) ||
        angular.isArray(val)
      ) {
        var targetMapIdx = (angular.isArray(model)) ?
          modelMapId : modelMapId + '::' + key;
        var newVal = this._buildModel(val, targetMapIdx);
        if (newVal) {
          if (angular.isArray(model)) {
            model.push(newVal);
          } else {
            model[key] = newVal;
          }
        }
      } else {
        model[key] = val;
      }
    }
  }
  
  return model;
};

BaseEndpoints.prototype._request = function (
  endpoint,
  params,
  modelMapId
) {
  var deferred = this._$q.defer();

  var req = this._$http.post(
    [
      this._env.api.resourceURL,
      this._activeVersion,
      endpoint
    ].join('/'), params
  );

  req.then(function (res) {
    var model = null;
    if (res.data.response) {
      model = this._buildModel(
        res.data.response, modelMapId
      );
    }
    deferred.resolve(model);
  }.bind(this))['catch'](function (error) {
    deferred.reject(error);
  }.bind(this));

  return deferred.promise;
};

module.exports = {
  klass: function() {
    return BaseEndpoints;
  }
};