'use strict';

var BaseEndpoints = function () {
};

/**
 * Initializes the class
 * 
 * @param {object} options           Options for this object
 * @param {string} options.baseURL   The base URL to use on this 
 *                                   collection of endpoints
 * @param {object} options.modelList The model list object this 
 *                                   object uses
 */
BaseEndpoints.prototype._init = function (options) {
  this._http = require('q-io/http');
  this._q = require('q');

  options = options || {};
  this._modelList = options.modelList;
  this._baseURL = options.baseURL;
};

BaseEndpoints.prototype.printA = function () {
  console.log('AAAAA');
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

/**
 * Proceeds with a HTTP request
 * 
 * @param {object} options            Options for this request
 * @param {string} options.endpoint   The endpoint to be used
 * @param {string} options.method     'POST' or 'GET' (default 'GET')
 * @param {object} options.modelMapId The id of the in the model list
 *
 * @returns {promise}
 */
BaseEndpoints.prototype._request = function (options) {
  var deferred = this._q.defer();

  var url = [
    this._baseURL,
    options.endpoint
  ].join('/');
  
  var req;
  options.method = options.method || 'GET';
  req = this._http.request({
    url: url,
    method: options.method
  });

  req.then(function (res) {
    var model = null;
    // if (res.data.response) {
    //   model = this._buildModel(
    //     res.data.response, options.modelMapId
    //   );
    // }
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