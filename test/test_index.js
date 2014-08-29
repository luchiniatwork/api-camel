'use strict';

require('./fixtures')
  .load('schedule-energy');

var should = require('chai').should();

var NBAEndpoints = require('../sample/nba-endpoints');
var nbaEndpoints = new NBAEndpoints();

// var nock = require('nock');
// nock.recorder.rec();

describe('Sample nbaEndpoints', function() {
  this.timeout(5000);

  it('should be an object', function() {
    nbaEndpoints.should.be.an('object');
  });

  it('should get team schedule (team Energy)', function(done) {
    nbaEndpoints.getTeamSchedule({team: 'energy'}).then(function (data) {
      done();
    })
    .fail(function (err) {
      done(err);
    });
  });
});
