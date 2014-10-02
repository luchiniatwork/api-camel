'use strict';

var debug = require('debug')('api-camel:base-endpoint');
var _ = require('lodash');

var BaseModel = require ('./base-model');

/**
 * Initializes the class
 * 
 * @param {object} options           Options for this object
 * @param {string} options.baseURL   The base URL to use on this 
 *                                   collection of endpoints
 * @param {object} options.modelList The model list object this 
 *                                   object uses
 */
var BaseEndpoints = function (options) {
  this._http = require('request');
  this._q = require('q');

  options = options || {};
  this._modelList = options.modelList;
  this._baseURL = options.baseURL;
  
  debug('initialized with', options);
};

BaseEndpoints.prototype._getModelConstructor = function (modelMapId) {
  debug(modelMapId, 'looking for meta objects');
  var out = {},
      regExpStr = null,
      construct = null,
      matchingType = null,
      hash = null,
      directCount = 0,
      hashedCount = 0;
  
  for (var modelIdx in this._modelList) {
    var mapIds = this._modelList[modelIdx].mapping;
    if (!_.isArray(mapIds)) {
      mapIds = [mapIds];
    }
    
    for (var mapIdx in mapIds) {
      if (_.isString(mapIds[mapIdx])) {
        regExpStr = mapIds[mapIdx];
        matchingType = 'DIRECT';
      } else {
        regExpStr = _.keys(mapIds[mapIdx])[0];
        matchingType = 'HASHED';
        hash = mapIds[mapIdx][regExpStr];
      }
      
      if (directCount > 1) throw 'Can\'t have more than one direct matching';
      
      var mapRegexp = new RegExp('^' + regExpStr + '$');
      if (mapRegexp.test(modelMapId)) {
        if (matchingType === 'DIRECT') {
          directCount++;
          debug(modelMapId, 'found DIRECT model match:', regExpStr);
        } else {
          hashedCount++;
          debug(modelMapId, 'found HASHED model match:', regExpStr, 'hashing to:', hash);
        }
        construct = this._modelList[modelIdx];
        var key = (matchingType === 'DIRECT') ? 'direct' : hash;
        out[key] = {
          construct: construct,
          matchingType: matchingType,
          hash: hash
        };
      }
    }
  }
  
  return out;
};

BaseEndpoints.prototype._sanitizeUnmetHigherLevels = function (model) {
  var out = null;
  if (model.isRootLevel()) {
    out = model;
  } else {
    if (_.isArray(model)) {
      for (var arrIdx in model) {
        if (this._sanitizeUnmetHigherLevels(model[arrIdx])) {
          out = model;
          break;
        }
      }
    } else {
      for (var modelIdx in model._data) {
        if (this._sanitizeUnmetHigherLevels(
          model._data[modelIdx]
        )) {
          out = model._data[modelIdx];
          break;
        }
      }
    }
  }
  return out;
};

BaseEndpoints.prototype._buildModel = function (src, modelMapId, options) {
  
  options = options || {};
  options.rootLevelFound = !!options.rootLevelFound;
  options.level = options.level || 0;
  
  var model = null,
      metaObjs = null,
      metaObj = null;
      
  if (src) {

    if (_.isArray(src)) {
      debug(modelMapId, 'creating array');
      model = [];
    } else {
      metaObjs = this._getModelConstructor(modelMapId);
      if (_.keys(metaObjs).length > 0) {
        options.metaObjIdx = options.metaObjIdx || 'direct';
        debug(modelMapId, 'has metaObjs. Using metaObjIdx', options.metaObjIdx);
        metaObj = metaObjs[options.metaObjIdx];
        if (metaObj) {
          var construct = metaObj.construct;
          options.rootLevelFound = true;
          // ignoring jshint here because it complains about the
          // small caps on the indentifier but I like it like this
          // exactly because it reminds us this is a meta-constructor
          model = new construct(); // jshint ignore:line
          debug(modelMapId, '... instantiating found model');
        } else {
          model = new BaseModel();
        }
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
        var newVal = this._buildModel(val, targetMapIdx, {
          rootLevelFound: options.rootLevelFound,
          metaObjIdx: options.metaObjIdx,
          level: options.level + 1
        });
        
        if (newVal) {
          if (
            typeof(newVal.getMetaObjs) === 'function' &&
            options.metaObjIdx &&
            options.metaObjIdx === 'direct'
          ) {
            
            var hashedMetaObjs = _.filter(
              _.keys(newVal.getMetaObjs()),
              function (itemKey) {
                return itemKey !== 'direct'
              }
            );

            for (var idx in hashedMetaObjs) {
              var hashedKey = hashedMetaObjs[idx];
              var hashedVal = this._buildModel(val, targetMapIdx, {
                rootLevelFound: options.rootLevelFound,
                metaObjIdx: hashedKey,
                level: options.level + 1
              });
              debug('setting hash', hashedKey, 'with value', hashedVal);
              model.set(hashedKey, hashedVal);
            }
          }
          
          if (_.isArray(model)) {
            model.push(newVal);
            debug(modelMapId, 'pushing to array for', modelMapId);
          } else {
            model.set(key, newVal);
          }
        }
        
      } else {
        model.set(key, val);
      }
    }
  
  }
  
  if (!_.isArray(model)) {
    model.setRootLevel(options.rootLevelFound);
    model.setDepth(options.level);
    if (metaObjs) model.setMetaObjs(metaObjs);
    if (options.metaObjIdx) model.setMetaObjIdx(options.metaObjIdx);
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
  
  var req;
  req = {
    url: url,
    method: options.method,
    json: true,
    withCredentials: !!options.withCredentials
  };

  var respCb = function (error, response, body) {
    if (!error && response.statusCode == 200) {
      debug('successfull 200 response');
      var model = null;
      if (body) {
        model = this._buildModel(
          body, options.namespace
        );
        model = this._sanitizeUnmetHigherLevels(model);
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