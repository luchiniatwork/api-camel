'use strict';

var gulp = require('gulp');
var del = require('del');
var appPaths = require('../config').app;

gulp.task('clean', function () {
  return del([
    appPaths.temp,
    appPaths.dist
  ]);
});