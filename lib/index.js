'use strict';

var BaseEndpoints = require('./base-endpoints');
var BaseModel     = require('./base-model');

module.exports = {
  
  /**
   * Returns the base class for an endpoints' collection
   * 
   * @return {object}
   */
  BaseEndpoints: BaseEndpoints,
  
  /**
   * Returns the base class for a model 
   * 
   * @return {object}
   */
  BaseModel: BaseModel
};