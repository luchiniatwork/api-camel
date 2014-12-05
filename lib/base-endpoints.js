'use strict';

var debug = require('debug')('api-camel:base-endpoint');
var _ = require('lodash');

var BaseModel = require ('./base-model');

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
  this._http = require('work-request');
  this._q = require('q');

  options = options || {};
  this._modelList = options.modelList;
  this._baseURL = options.baseURL;
  
  debug('initialized with', options);
};

BaseEndpoints.prototype._getModelConstructor = function (modelMapId) {
  var out = null;
  for (var modelIdx in this._modelList) {
    var mapIds = this._modelList[modelIdx].mapping;
    if (!_.isArray(mapIds)) {
      mapIds = [mapIds];
    }
    for (var mapIdx in mapIds) {
      var mapRegexp = new RegExp('^' + mapIds[mapIdx] + '$');
      if (mapRegexp.test(modelMapId)) {
        debug('found model constructor with mapping', mapIds[mapIdx]);
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

  if (src) {
    if (_.isArray(src)) {
      debug('creating array for', modelMapId);
      model = [];
    } else if (_.isObject(src)) {
      var modelConstructor = this._getModelConstructor(modelMapId);
      if (modelConstructor) {
        // ignoring jshint here because it complains about the
        // small caps on the indentifier but I like it like this
        // exactly because it reminds us this is a meta-constructor
        model = new modelConstructor(); // jshint ignore:line
        debug('... instantiating found model');
      } else {
        model = new BaseModel();
      } 
    }

    for (var key in src) {
      var val = src[key];
      if (
        _.isObject(val) ||
        _.isArray(val)
      ) {
        var targetMapIdx = (_.isArray(model)) ?
          modelMapId : modelMapId + '::' + key;
        var newVal = this._buildModel(val, targetMapIdx);
        if (newVal) {
          if (_.isArray(model)) {
            model.push(newVal);
            debug('pushing to array for', modelMapId);
          } else {
            model.set(key, newVal);
          }
        }
      } else {
        model.set(key, val);
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
 * @param {string} options.modelMapId The id of the in the model list
 * @param {string} options.withCredentials HTTP request credentials flag
 *                                         (default false)
 *
 * @returns {promise}
 */
BaseEndpoints.prototype._request = function (options) {
  var deferred = this._q.defer();

  var url = [
    this._baseURL,
    options.endpoint
  ].join('/');
  
  debug('firing request', url);
  
  options.method = options.method || 'GET';
  options.withCredentials = options.withCredentials || false;
  
  var req;
  req = {
    url: url,
    method: options.method,
    json: true,
    withCredentials: options.withCredentials
  };

  var respCb = function (error, response, body) {
    if (!error && response.statusCode == 200) {
      debug('successfull 200 response');
      var model = null;
      if (body) {
        model = this._buildModel(
          body, options.modelMapId
        );
      }
      deferred.resolve(model);
    } else {
      debug('error response', error)
      deferred.reject(error);
    }
  }.bind(this);

  this._http(req, respCb);

  return deferred.promise;
};

module.exports = BaseEndpoints;