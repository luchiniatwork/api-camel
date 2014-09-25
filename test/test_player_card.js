'use strict';

var should = require('chai').should();

var NBAEndpoints = require('../sample/nba-endpoints');
var nbaEndpoints = new NBAEndpoints();

require('./fixtures')
  .load('player-card-solomon-jones');

// var nock = require('nock');
// nock.recorder.rec();

describe('Sample NBAEndpoints - player card', function() {
  this.timeout(5000);

  it('should get the proper player card', function(done) {
    nbaEndpoints.getPlayerCard({playerID: '200780'}).then(function (playerCard) {
      // var playerCard = playerCardResp.get('pl');
      
      playerCard.getDOB().should.equal('1984-07-16');
      playerCard.getFirstName().should.equal('Solomon');
      playerCard.getLastName().should.equal('Jones');
      playerCard.getHeight().should.equal('6-10');
      playerCard.getWeight().should.equal(245);
      playerCard.getID().should.equal(200780);
      
      var ca = playerCard.getCareerAverages();
      ca.getPoints().should.equal(8.9);
      ca.getGamesPlayed().should.equal(17);
      ca.getBlocks().should.equal(1.47);
      ca.getSteals().should.equal(0.59);
      ca.getRebounds().should.equal(6.12);
      ca.getAssists().should.equal(1.4);
      ca.getMinutes().should.equal(24.3);
      
      var seasons = playerCard.getCareerAverages().getSeasonAverages();
      seasons.length.should.equal(1);
      seasons[0].getPoints().should.equal(8.9);
      seasons[0].getGamesPlayed().should.equal(17);
      seasons[0].getBlocks().should.equal(1.47);
      seasons[0].getSteals().should.equal(0.59);
      seasons[0].getRebounds().should.equal(6.1);
      seasons[0].getAssists().should.equal(1.4);
      seasons[0].getMinutes().should.equal(24.3);
      
      done();
    })
    .fail(function (err) {
      done(err);
    });
  });
  
});
