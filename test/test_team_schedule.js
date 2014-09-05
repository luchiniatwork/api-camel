'use strict';

var should = require('chai').should();

var NBAEndpoints = require('../sample/nba-endpoints');
var nbaEndpoints = new NBAEndpoints();

require('./fixtures')
  .load('schedule-energy');

// var nock = require('nock');
// nock.recorder.rec();

describe('Sample NBAEndpoints - team schedule', function() {
  this.timeout(5000);

  it('getTeamSchedule should get the proper team data (Energy)', function(done) {
    nbaEndpoints.getTeamSchedule({team: 'energy'}).then(function (teamScheduleResponse) {
      var team = teamScheduleResponse.getTeam();
      team.getName().should.equal('Energy');
      team.getAbbreviation().should.equal('IWA');
      team.getCity().should.equal('Iowa');
      team.getID().should.equal(1612709911);
      done();
    })
    .fail(function (err) {
      done(err);
    });
  });

  it('getTeamSchedule should get the proper team schedule (Energy)', function(done) {
    nbaEndpoints.getTeamSchedule({team: 'energy'}).then(function (teamScheduleResponse) {
      var games = teamScheduleResponse.getGames();
      games.length.should.equal(50);

      games[0].getID().should.equal('2021300004');
      games[0].getCode().should.equal('20131122/IWATUL');
      games[0].isNecessary().should.equal(true);
      games[0].getStatus().should.equal('FINAL');
      
      games[0].getArenaCity().should.equal('Tulsa');
      games[0].getArenaName().should.equal('SpiritBank Event Center');
      games[0].getArenaState().should.equal('OK');
      
      games[0].getDate().should.equal('2013-11-22');
      games[0].getEasternTime().should.equal('2013-11-22T20:00:00');
      games[0].getHomeTeamTime().should.equal('2013-11-22T19:00:00');
      games[0].getVisitingTeamTime().should.equal('2013-11-22T19:00:00');

      games[49].getID().should.equal('2021300425');
      games[49].getCode().should.equal('20140109/SPGIWA');
      games[49].isNecessary().should.equal(true);
      games[49].getStatus().should.equal('FINAL');
      
      games[49].getArenaCity().should.equal('Reno');
      games[49].getArenaName().should.equal('Reno Events Center');
      games[49].getArenaState().should.equal('NV');
      
      games[49].getDate().should.equal('2014-01-09');
      games[49].getEasternTime().should.equal('2014-01-09T18:30:00');
      games[49].getHomeTeamTime().should.equal('2014-01-09T17:30:00');
      games[49].getVisitingTeamTime().should.equal('2014-01-09T18:30:00');
      
      done();
    })
    .fail(function (err) {
      done(err);
    });
  });

  it('getTeamSchedule should get the proper visiting & home teams', function(done) {
    nbaEndpoints.getTeamSchedule({team: 'energy'}).then(function (teamScheduleResponse) {
      var games = teamScheduleResponse.getGames();

      var team = games[0].getVisitingTeam();
      team.getID().should.equal(1612709911);
      team.getCity().should.equal('Iowa');
      team.getAbbreviation().should.equal('IWA');
      team.getName().should.equal('Energy');
      team.getScore().should.equal('127');
      team.getRecord().should.equal('1-0');

      team = games[0].getHomeTeam();
      team.getID().should.equal(1612709889);
      team.getCity().should.equal('Tulsa');
      team.getAbbreviation().should.equal('TUL');
      team.getName().should.equal('66ers');
      team.getScore().should.equal('117');
      team.getRecord().should.equal('0-1');

      team = games[49].getVisitingTeam();
      team.getID().should.equal(1612709917);
      team.getCity().should.equal('Springfield');
      team.getAbbreviation().should.equal('SPG');
      team.getName().should.equal('Armor');
      team.getScore().should.equal('132');
      team.getRecord().should.equal('4-13');

      team = games[49].getHomeTeam();
      team.getID().should.equal(1612709911);
      team.getCity().should.equal('Iowa');
      team.getAbbreviation().should.equal('IWA');
      team.getName().should.equal('Energy');
      team.getScore().should.equal('143');
      team.getRecord().should.equal('12-5');

      done();
    })
    .fail(function (err) {
      done(err);
    });
  });

  it('getTeamSchedule should get the proper broadcasters', function(done) {
    nbaEndpoints.getTeamSchedule({team: 'energy'}).then(function (teamScheduleResponse) {
      var games = teamScheduleResponse.getGames();
      
      var broadcasters = games[0].getBroadcasters();
      broadcasters.length.should.equal(2);
      broadcasters[0].getSequence().should.equal(1);
      broadcasters[0].getDisplayName().should.equal('YouTube');
      broadcasters[0].getLanguage().should.equal('English');
      broadcasters[0].getScope().should.equal('natl');
      broadcasters[0].getType().should.equal('tv');
      broadcasters[1].getSequence().should.equal(2);
      broadcasters[1].getDisplayName().should.equal('1300 ESPN');
      broadcasters[1].getLanguage().should.equal('English');
      broadcasters[1].getScope().should.equal('home');
      broadcasters[1].getType().should.equal('radio');
      
      broadcasters = games[49].getBroadcasters();
      broadcasters.length.should.equal(1);
      broadcasters[0].getSequence().should.equal(1);
      broadcasters[0].getDisplayName().should.equal('YouTube');
      broadcasters[0].getLanguage().should.equal('English');
      broadcasters[0].getScope().should.equal('natl');
      broadcasters[0].getType().should.equal('tv');

      done();
    })
    .fail(function (err) {
      done(err);
    });
  });

});
