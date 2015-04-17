import debug from 'debug';
import BaseModel from './base-model';

export default class Lance {
  
  constructor(options) {
    this._debug = debug('lance');
    
    this._http = require('request');
    this._q = require('q');
    
    options = options || {};
    this._baseURL = options.baseURL;
    this._rootPath = options.rootPath;
    this._modelMap = options.modelMap || {};

    this._debug('constructing with options', options);
  }
  
  initialize() {
    var deferred = this._q.defer();

    this._debug('initializing');

    this._request(this._baseURL + this._rootPath).then(function (model) {
      this._metaModel = model;
      this._debug('initialized');
      deferred.resolve(model);
    }.bind(this));
    
    return deferred.promise;
  }
  
  get(resource_id, params) {
    var deferred = this._q.defer();
    
    var link = this._metaModel.getLink(resource_id);
    if (link) {
      var resourceURI = link.href;
      if (link.templated) {
        for (var param in params) {
          resourceURI = resourceURI.replace(new RegExp(`{${param}}`), params[param]);
        }
        resourceURI = resourceURI.replace(/{.+?}/g, '')
      }
      this._request(this._baseURL + resourceURI).then(function(model) {
        deferred.resolve(model);
      }.bind(this));
    } else {
      deferred.reject(resource_id + ' not found on _links');
    }
    
    return deferred.promise;
  }
  
  // getByURL {
  //   //TODO
  //   var deferred = this._q.defer();
  //
  //   var link = this._metaModel.getLink(resource_id);
  //   if (link) {
  //     var resourceURI = link.href;
  //     if (link.templated) {
  //       for (var param in params) {
  //         resourceURI = resourceURI.replace(new RegExp(`{${param}}`), params[param]);
  //       }
  //       resourceURI = resourceURI.replace(/{.+?}/g, '')
  //     }
  //     this._request(this._baseURL + resourceURI).then(function(model) {
  //       deferred.resolve(model);
  //     }.bind(this));
  //   } else {
  //     deferred.reject(resource_id + ' not found on _links');
  //   }
  //
  //   return deferred.promise;
  // }
  
  metaModel() {
    return this._metaModel;
  }
  
  _request(url) {
    var deferred = this._q.defer();
    
    var req;
    req = {
      url: url,
      method: 'GET',
      json: true,
      withCredentials: true
    };
    this._debug('GET', url);

    var respCb = function (error, response, body) {
      if (!error && response.statusCode == 200) {
        this._debug('successfull 200 response');
        var model = null;
        if (body) {
          model = this._buildModel(body);
        }
        deferred.resolve(model);
      } else {
        this._debug('error response', error)
        deferred.reject(error);
      }
    }.bind(this);
    this._http(req, respCb);
    
    return deferred.promise;
  }
  
  _buildModel(body) {
    if (body._meta && body._meta.class) {
      this._debug('meta class id is', body._meta.class);
      if (this._modelMap[body._meta.class]) {
        this._debug('meta class found');
        return new this._modelMap[body._meta.class](this, body);
      } else {
        this._debug('can\'t find meta class', body._meta.class, 'on model map. instancing BaseModel');
        return new BaseModel(this, body);
      }
    } else {
      this._debug('no meta class provided. instancing BaseModel');
      return new BaseModel(this, body);
    }
  }
  
  registerModel(id, klass) {
    this._modelMap[id] = klass;
  }
}