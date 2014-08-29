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
    nbaEndpoints.getTeamSchedule({team: 'energy'}).then(function (gameResponse) {

      gameResponse.getTeamName().should.equal('Energy');
      gameResponse.getTeamAbbreviation().should.equal('IWA');
      gameResponse.getTeamCity().should.equal('Iowa');
      gameResponse.getTeamId().should.equal(1612709911);

      console.log(gameResponse.getGames().length);
      console.log(JSON.stringify(gameResponse.getGames()[0]));
      done();
    })
    .fail(function (err) {
      done(err);
    });
  });
});
