'use strict';

var debug = require('debug')('fixtures');

var nock = require('nock');
var path = require('path');

var loader = function (names) {
  // var bypassFixtures = process.env.BYPASS_FIXTURES;
  // debug('bypassing?', bypassFixtures);
  names = (typeof names === 'string') ? [names] : names;
  for (var idx in names) {
    var fp = path.join('test', 'fixtures', names[idx] + '.js');
    try {
      debug('attempting to load fixture', names[idx], 'at', fp);
      require('../' + fp);
    } catch (e) {
      debug('fixture not found');
    }
  }
  return loader;
};

module.exports = {
  load: loader
};
