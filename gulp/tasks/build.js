'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var scriptConfig = require('../config').scripts;

gulp.task('build', ['clean'], function (callback) {
  var bundleQueue = scriptConfig.bundleConfigs.length;

  var reportFinished = function() {
    bundleQueue--;

    if (bundleQueue === 0) {
      callback();
    }
  };

  var browserifyThis = function (bundleConfig) {
    var bundle = function() {
      return gulp.src(bundleConfig.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(gulp.dest(bundleConfig.dest))
        .pipe(uglify())
        .pipe(concat(bundleConfig.outputName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(bundleConfig.minDest))
        .on('end', reportFinished)
    };

    return bundle();
  };

  scriptConfig.bundleConfigs.forEach(browserifyThis);
});