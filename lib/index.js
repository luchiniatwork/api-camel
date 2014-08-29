'use strict';

module.exports = {
  
  /**
   * Returns the base class for an endpoints' collection
   * 
   * @return {object}
   */
  BaseEndpoints: function () {
    return require('./base-endpoints').klass();
  },
  
  /**
   * Returns the base class for a model 
   * 
   * @return {object}
   */
  BaseModel: function () {
    return require('./base-model').klass();
  }
};