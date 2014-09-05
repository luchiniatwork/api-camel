'use strict';

var should = require('chai').should();

var apiCamel = require('../lib/index');

describe('Basic api-camel interface', function() {

  it('should return BaseEndpoints constructor', function() {
    apiCamel.BaseEndpoints.should.be.a('function');
  });

  it('should return BaseModel constructor', function() {
    apiCamel.BaseModel.should.be.a('function');
  });
  
});
