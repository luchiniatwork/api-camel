'use strict';

var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var scriptConfig = require('../config').scripts;

gulp.task('build', function (callback) {
  var bundleQueue = scriptConfig.bundleConfigs.length;

  var reportFinished = function() {
    bundleQueue--;

    if (bundleQueue === 0) {
      callback();
    }
  };

  var browserifyThis = function (bundleConfig) {
    var bundler = browserify({
      cache: { },
      packageCache: { },
      fullPaths: true,
      entries: bundleConfig.entries,
      extensions: bundleConfig.extensions,
      debug: scriptConfig.debug
    });

    bundler.transform(babelify);

    var bundle = function() {
      return bundler
        .bundle()
        .pipe(source(bundleConfig.outputName))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished);
    };

    return bundle();
  };

  scriptConfig.bundleConfigs.forEach(browserifyThis);
});