// var db = require('orchestrate')(process.env.ORCHESTRATE_API_KEY);
// var async = require('async');
// var assert = require('assert');
// var addInSet = require('../lib').addInSet;

// var nock = require('nock');

var should = require('chai').should();
var record = require('./record');

var apiCamel = require('../lib/index');
var BaseEndpoints = apiCamel.BaseEndpoints();

var TestEndpoints = function () {
  this._init({
    baseURL: 'http://data.nba.com/data/10s/v2014/json'
  });
};

TestEndpoints.prototype = new BaseEndpoints();// apiCamel.getBaseEndpoints();

TestEndpoints.prototype.getTeamSchedule = function(options) {
  options = options || {};
  options.league = options.league || 'dleague';
  options.season = options.season || '2013';
  options.team = options.team || 'energy';
  options.team = options.team.toLowerCase();
  
  var endpoint = [
    'mobile_teams',
    options.league,
    options.season,
    'teams',
    options.team + '_schedule_02.json'
  ].join('/');
  
  return this._request({
    endpoint: endpoint
  });
};

describe('simple test', function() {
  this.timeout(5000);

  var testEndpoints = new TestEndpoints();
  
  it('endpoints should allow creating objects', function() {
    testEndpoints.should.be.an('object');
  });

  it('basic request', function(done) {
    testEndpoints.getTeamSchedule({team: 'energy'}).then(function (data) {
      done();
    })
    .fail(function (err) {
      done(err);
    });;
  });

});

// describe('addInSet', function () {
//   var recorder = record('addInSet');
//   before(recorder.before);
//
//   before(function () {
//     this.collection = 'addInSetTest';
//   });
//
//   beforeEach(function () {
//     // prevent overlapping keys
//     this.current_test_key = this.current_test_key || 0;
//     this.key = String(this.current_test_key);
//     this.current_test_key++;
//   });
//
//   after(function (done) {
//     db.deleteCollection(this.collection)
//     .then(function () {
//       done();
//     })
//     .fail(done);
//   });
//
//   it('should insert 10 numbers in order', function (done) {
//     var self = this;
//     this.timeout(0);
//
//     async.series([
//       function (done) {
//         // insert our data in order
//         async.timesSeries(10, function (n, done) {
//           addInSet(self.collection, self.key, n, done);
//         }, done);
//       },
//       function (done) {
//         // ensure our data is in order
//         db.get(self.collection, self.key)
//         .then(function (res) {
//           var doc = res.body;
//           assert(doc.numbers.length);
//           // for each number we inserted
//           // ensure they're inserted in order
//           doc.numbers.reduce(function (a, b) {
//             if (a) assert(b > a);
//             return b;
//           });
//           done();
//         })
//         .fail(done);
//       }
//     ], done);
//   });
//
//   after(recorder.after);
// });
