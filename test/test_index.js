
require('./fixtures')
  .load('schedule-energy');

var nbaEndpoints = require('../sample/nba-endpoints').instance();

// var nock = require('nock');
// nock.recorder.rec();

var should = require('chai').should();

describe('generic tests', function() {
  this.timeout(5000);

  it('basic request', function(done) {
    nbaEndpoints.getTeamSchedule({team: 'energy'}).then(function (data) {
      done();
    })
    .fail(function (err) {
      done(err);
    });
  });
});
