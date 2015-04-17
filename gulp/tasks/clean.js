'use strict';

var gulp = require('gulp');
var del = require('del');
var scriptConfig = require('../config').scripts;

gulp.task('clean', function (callback) {
  var bundleQueue = scriptConfig.bundleConfigs.length;

  var reportFinished = function() {
    bundleQueue--;

    if (bundleQueue === 0) {
      callback();
    }
  };
  
  var cleanThis = function (bundleConfig) {
    return del(
      [bundleConfig.dest, bundleConfig.minDest],
      reportFinished
    );
  };

  scriptConfig.bundleConfigs.forEach(cleanThis);
});