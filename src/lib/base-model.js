'use strict';

import debug from 'debug';

export default class BaseModel {

  constructor(lance, data) {
    this._debug = debug('lance:base-model');
    this._lance = lance;
    this._data = data || {};
    this._selfFetched = false;
    this._collection = null;
  }

  get(name) {
    if (!this._data[name] && !this._selfFetched) {
      //TODO lance.getByURL
    }
    return this._data[name];
  }

  set(name, value) {
    this._data[name] = value;
  }

  collection() {
    var out = null;
    if (this._data._meta && this._data._meta.collection) {
      if (!this._collection) {
        var id = this._data._meta.collection;
        this._debug('collection', id, 'not instanced yet. instancing now');
        this._collection = [];
        for (var idx in this._data[id]) {
          this._collection.push(this._lance._buildModel(this._data[id][idx]));
        }
      } else {
        this._debug('collection', id, 'already instanced. returning it');
      }
      out = this._collection;
    }
    return out;
  }

  getLinks() {
    return this._data._links;
  }
  
  getMeta() {
    return this._data._meta;
  }
  
  getClass() {
    var out = null;
    if (this._data._meta) {
      out = this._data._meta.class;
    }
    return out;
  }
  
  getLink(id) {
    var out = null;
    if (this._data && this._data._links && this._data._links[id]) {
      out = this._data._links[id];
    }
    return out;
  }
  
  selfLink() {
    getResourceLink('self');
  }

  nextLink() {
    getResourceLink('next');
  }
  
  prevLink() {
    getResourceLink('prev');
  }

}